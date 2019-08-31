function formatOrder(requestedFields, order) {
    var row = requestedFields.asArray().map(function(requestedField) {
    switch (requestedField.getId()) {
      case 'location':
        return order.location_name;
      case 'date':
        return Utilities.formatDate(new Date(order.created_at), 'MDT', 'yyyyMMdd');
      case 'hour':
        return Utilities.formatDate(new Date(order.created_at), 'MDT', 'HH');
      case 'minute':
        return Utilities.formatDate(new Date(order.created_at), 'MDT', 'mm');
      case 'customerId':
        return order.customer_id;
      case 'source':
        return order.source !== undefined ? order.source.name : 'Not Set';
      case 'reference_id':
        return order.reference_id;
      case 'state':
        return order.state;
      case 'totalMoney':
        return order.net_amounts !== undefined ? order.net_amounts.total_money.amount / 100 : 0;
      case 'discountMoney':
        return order.net_amounts !== undefined ? order.net_amounts.discount_money.amount / 100 : 0;
      case 'taxMoney':
        return order.net_amounts !== undefined ? order.net_amounts.tax_money.amount / 100 : 0;
      case 'serviceChargeMoney':
        return order.net_amounts !== undefined ? order.net_amounts.service_charge_money.amount / 100 : 0;
      case 'tipMoney':
        return order.net_amounts !== undefined ? order.net_amounts.tip_money.amount / 100 : 0;
      case 'refundTotalMoney':
        return order.return_amounts !== undefined ? order.return_amounts.tip_money.amount / 100 : 0;
      case 'refundDiscountMoney':
        return order.return_amounts !== undefined ? order.return_amounts.discount_money.amount / 100 : 0;
      case 'refundTaxMoney':
        return order.return_amounts !== undefined ? order.return_amounts.tax_money.amount / 100 : 0;
      case 'refundServiceChargeMoney':
        return order.return_amounts !== undefined ? order.return_amounts.service_charge_money.amount / 100 : 0;
      case 'refundTipMoney':
        return order.return_amounts !== undefined ?  order.return_amounts.tip_money.amount / 100 : 0;
      default:
        return cc
          .newUserError()
          .setDebugText(
            'Field "' +
              requestedField.getId() +
              '" has not been accounted for in code yet.'
          )
          .setText('You cannot use ' + requestedField.getId() + ' yet.')
          .throwException();
    }
  });
  return {'values': row};
}

function getFormattedOrders(response, requestedFields) {
  var locations = fetchDataFromListLocationsEndpoint();
  
  response.forEach(function(order, index){
    
    order.location_name = locations.reduce(function(location, current){

        if (location.id === order.location_id) {
          return location;
        } else {
          return current;
        }
      
    }).name;
  });
    
  data = response.map(function(order){
    return formatOrder(requestedFields, order);
  });
  return data;
}