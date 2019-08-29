var cc = DataStudioApp.createCommunityConnector();

function getOrdersFields() {
  var fields = cc.getFields();
  var types = cc.FieldType;
  var aggregations = cc.AggregationType;

  fields
    .newDimension()
    .setId('location')
    .setName('Location')
    .setType(types.TEXT);
  
  fields
    .newDimension()
    .setId('date')
    .setName('Date')
    .setType(types.YEAR_MONTH_DAY);
  
  fields
    .newDimension()
    .setId('hour')
    .setName('Hour')
    .setType(types.HOUR);
  
  fields
    .newDimension()
    .setId('minute')
    .setName('Minute')
    .setType(types.MINUTE);

  fields
    .newDimension()
    .setId('customerId')
    .setName('Customer ID')
    .setType(types.TEXT);
  
  fields
    .newDimension()
    .setId('source')
    .setName('Source')
    .setType(types.TEXT);
  
  fields
    .newDimension()
    .setId('reference_id')
    .setName('Reference ID')
    .setType(types.TEXT);
  
  fields
    .newDimension()
    .setId('state')
    .setName('State')
    .setType(types.TEXT);

  fields
    .newMetric()
    .setId('totalMoney')
    .setName('Total Money')
    .setType(types.CURRENCY_USD)
    .setAggregation(aggregations.SUM);
  
  fields
    .newMetric()
    .setId('discountMoney')
    .setName('Discount Money')
    .setType(types.CURRENCY_USD)
    .setAggregation(aggregations.SUM);
  
  fields
    .newMetric()
    .setId('taxMoney')
    .setName('Tax Money')
    .setType(types.CURRENCY_USD)
    .setAggregation(aggregations.SUM);
  
  fields
    .newMetric()
    .setId('serviceChargeMoney')
    .setName('Service Charge Money')
    .setType(types.CURRENCY_USD)
    .setAggregation(aggregations.SUM);
  
  fields
    .newMetric()
    .setId('tipMoney')
    .setName('Tip Money')
    .setType(types.CURRENCY_USD)
    .setAggregation(aggregations.SUM);
  
  fields
    .newMetric()
    .setId('refundTotalMoney')
    .setName('Refund Total Money')
    .setType(types.CURRENCY_USD)
    .setAggregation(aggregations.SUM);
  
  fields
    .newMetric()
    .setId('refundDiscountMoney')
    .setName('Refund Discount Money')
    .setType(types.CURRENCY_USD)
    .setAggregation(aggregations.SUM);
  
  fields
    .newMetric()
    .setId('refundTaxMoney')
    .setName('Refund Tax Money')
    .setType(types.CURRENCY_USD)
    .setAggregation(aggregations.SUM);
  
  fields
    .newMetric()
    .setId('refundServiceChargeMoney')
    .setName('Refund Service Charge Money')
    .setType(types.CURRENCY_USD)
    .setAggregation(aggregations.SUM);
  
  fields
    .newMetric()
    .setId('refundTipMoney')
    .setName('Refund Tip Money')
    .setType(types.CURRENCY_USD)
    .setAggregation(aggregations.SUM);
  

  return fields;
}

// https://developers.google.com/datastudio/connector/reference#getschema
function getSchema(request) {
  switch (request.configParams.data_type) {
    case 'orders':
      return {schema: getOrdersFields().build()};
  }
}

// https://developers.google.com/datastudio/connector/reference#getdata
function getData(request) {

  var requestedFields = getOrdersFields().forIds(
    request.fields.map(function(field) {
      return field.name;
    })
  );

  try {
    var apiResponse = fetchDataFromSearchOrdersEndpoint(request);
    var data = getFormattedOrders(apiResponse, requestedFields);
  } catch (e) {
    cc.newUserError()
      .setDebugText('Error fetching data from API. Exception details: ' + e)
      .setText(
        'The connector has encountered an unrecoverable error. Please try again later, or file an issue if this error persists.'
      )
      .throwException();
  }

  return {
    schema: requestedFields.build(),
    rows: data
  };
}



function getFormattedOrders(response, requestedFields) {
  var data = response.map(function(order){
    return formatOrder(requestedFields, order);
  });
  return data;
}
                          
                        
function formatOrder(requestedFields, order) {
    var row = requestedFields.asArray().map(function(requestedField) {
    switch (requestedField.getId()) {
      case 'location':
        return order.location_id;
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

function getConfig() {
  var locations = fetchDataFromListLocationsEndpoint();
  
  var config = cc.getConfig();
  
  var option1 = config.newOptionBuilder()
  .setLabel("Orders")
  .setValue("orders");

/*var option2 = config.newOptionBuilder()
  .setLabel("Line Items")
  .setValue("line_items");
  */
  
  var locationSelector = config.newSelectMultiple()
  .setId("locations")
  .setName("Locations")
  .setHelpText("Select the Locations you wish to pull data from")
  
  locations.forEach(function(location) {
    locationSelector.addOption(config.newOptionBuilder()
                              .setLabel(location.name)
                              .setValue(location.id));
  });

config.newSelectSingle()
  .setId("data_type")
  .setName("Data Type")
  .setHelpText("Select the data type you're interested in.")
  .addOption(option1)
  //.addOption(option2);
  
  config.setDateRangeRequired(true);

  return config.build();
}