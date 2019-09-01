function formatOrder(requestedFields, order) {
    var row = requestedFields.asArray().map(function(requestedField) {
    switch (requestedField.getId()) {
      case 'location':
        return order.location_name;
      case 'locationState':
        return order.location_state;
      case 'locationCity':
        return order.location_city;
      case 'locationAddressLine1':
        return order.location_address_line_1;
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

function formatLineItem(requestedFields, lineItem, order) {
    var row = requestedFields.asArray().map(function(requestedField) {
    switch (requestedField.getId()) {
      case 'location':
        return order.location_name;
      case 'locationState':
        return order.location_state;
      case 'locationCity':
        return order.location_city;
      case 'locationAddressLine1':
        return order.location_address_line_1;
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
      case 'state':
        return order.state;
      case 'category':
        return lineItem.category;
      case 'name':
        return lineItem.name;
      case 'variationName':
        return lineItem.variation_name;
      case 'note':
        return lineItem.note;
      case 'unit':
        return getUnit(lineItem);
      case 'quantity':
        return lineItem.quantity;
      case 'basePriceMoney':
        return lineItem.base_price_money.amount / 100;
      case 'grossSalesMoney':
        return lineItem.gross_sales_money.amount / 100;
      case 'totalDiscountMoney':
        return lineItem.total_discount_money.amount / 100;
      case 'totalTaxMoney':
        return lineItem.total_tax_money.amount / 100;
      case 'totalMoney':
        return lineItem.total_money.amount / 100;
      case 'variationTotalPriceMoney':
        return lineItem.variation_total_price_money.amount / 100;
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

function formatModifier(requestedFields, modifier, lineItem, order) {
    var row = requestedFields.asArray().map(function(requestedField) {
    switch (requestedField.getId()) {
      case 'location':
        return order.location_name;
      case 'locationState':
        return order.location_state;
      case 'locationCity':
        return order.location_city;
      case 'locationAddressLine1':
        return order.location_address_line_1;
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
      case 'state':
        return order.state;
      case 'category':
        return lineItem.category;
      case 'itemName':
        return lineItem.name;
      case 'variationName':
        return lineItem.variation_name;
      case 'quantity':
        return lineItem.quantity;
      case 'name':
        return modifier.name;
      case 'mod_list':
        return modifier.mod_list;
      case 'basePriceMoney':
        return modifier.base_price_money.amount / 100;
      case 'totalPriceMoney':
        return modifier.total_price_money.amount / 100;
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
    var thisLocation = locations.reduce(function(location, current){
        if (location.id === order.location_id) {
          return location;
        } else {
          return current;
        }
    });
    
    order.location_name = thisLocation.name !== undefined ? thisLocation.name : 'Unknown';
    order.location_address_line_1 = thisLocation.address_line_1 !== undefined ? thisLocation.address_line_1 : 'Unknown';
    order.location_city = thisLocation.locality !== undefined ? thisLocation.locality : 'Unknown';
    order.location_state = thisLocation.administrative_district_level_1 !== undefined ? thisLocation.administrative_district_level_1 : 'Unknown';
  });
    
  data = response.map(function(order){
    return formatOrder(requestedFields, order);
  });
  return data;
}

function getFormattedLineItems(response, requestedFields) {
  var locations = fetchDataFromListLocationsEndpoint();
  
  response.forEach(function(order, index){
    var thisLocation = locations.reduce(function(location, current){
        if (location.id === order.location_id) {
          return location;
        } else {
          return current;
        }
    });
    
    order.location_name = thisLocation.name !== undefined ? thisLocation.name : 'Unknown';
    order.location_address_line_1 = thisLocation.address_line_1 !== undefined ? thisLocation.address_line_1 : 'Unknown';
    order.location_city = thisLocation.locality !== undefined ? thisLocation.locality : 'Unknown';
    order.location_state = thisLocation.administrative_district_level_1 !== undefined ? thisLocation.administrative_district_level_1 : 'Unknown';
  });
    
  var data = [];
  
  var arrays = response.map(function(order) {return order.line_items;}).filter(function(item) {return item !== undefined;});
  var lineItems = [].concat.apply([], arrays);
  var objectIds = lineItems.map(function(lineItem) {return lineItem.catalog_object_id;}).filter(function(item) {return item !== undefined;});
  
  var objects = fetchDataFromBatchRetrieveEndpoint(objectIds);
  
  var items = objects.filter(function(object) {return object.type === 'ITEM'});
  var itemVariations = objects.filter(function(object) {return object.type === 'ITEM_VARIATION'});
  
  var categoryIds = items.map(function(item) {return item.item_data.category_id;}).filter(function(id) {return id !== undefined;});
  
  var categories = fetchDataFromBatchRetrieveEndpoint(categoryIds);
  
  response.forEach(function(order){
    
    if (order.line_items !== undefined) {
      var lineItems = order.line_items.map(function(lineItem) {
        lineItem.category = findCategory(lineItem, itemVariations, items, categories);
        return formatLineItem(requestedFields, lineItem, order);
      });
      data = data.concat(lineItems);
    }
  });
  
  return data;
}

function getFormattedModifiers(response, requestedFields) {
  var locations = fetchDataFromListLocationsEndpoint();
  
  response.forEach(function(order, index){
    var thisLocation = locations.reduce(function(location, current){
        if (location.id === order.location_id) {
          return location;
        } else {
          return current;
        }
    });
    
    order.location_name = thisLocation.name !== undefined ? thisLocation.name : 'Unknown';
    order.location_address_line_1 = thisLocation.address.address_line_1 !== undefined ? thisLocation.address.address_line_1 : 'Unknown';
    order.location_city = thisLocation.address.locality !== undefined ? thisLocation.address.locality : 'Unknown';
    order.location_state = thisLocation.address.administrative_district_level_1 !== undefined ? thisLocation.address.administrative_district_level_1 : 'Unknown';
  });
    
  var data = [];
  
  var lineItemArrays = response.map(function(order) {return order.line_items;}).filter(function(item) {return item !== undefined;});
  var lineItems = [].concat.apply([], lineItemArrays);
  var itemVariationIds = lineItems.map(function(lineItem) {return lineItem.catalog_object_id;}).filter(function(item) {return item !== undefined;});
  
  var modifierArrays = lineItems.map(function(lineItem) {return lineItem.modifiers;}).filter(function(item) {return item !== undefined;});
  var lineItemModifiers = [].concat.apply([], modifierArrays);
  
  var objects = fetchDataFromBatchRetrieveEndpoint(removeDups(itemVariationIds));
  
  var items = objects.filter(function(object) {return object.type === 'ITEM'});
  var itemVariations = objects.filter(function(object) {return object.type === 'ITEM_VARIATION'});
  
  var categoryIds = items.map(function(item) {return item.item_data.category_id;}).filter(function(id) {return id !== undefined;});
  var modIds = lineItemModifiers.map(function(mod) {return mod.catalog_object_id;}).filter(function(id) {return id !== undefined;});
  
  var categories = fetchDataFromBatchRetrieveEndpoint(removeDups(categoryIds));
  var modifiers = fetchDataFromBatchRetrieveEndpoint(removeDups(modIds));
  
  var modListIds = modifiers.filter(function(mod) {return mod !== undefined;}).map(function(mod) {return mod.custom_attributes.filter(function(attr) {return attr.name === 'modifier_list_id';})[0].string_value;});
  
  var modLists = fetchDataFromBatchRetrieveEndpoint(removeDups(modListIds));
  var modLists = modLists.filter(function() {return modLists !== undefined;} );

  response.forEach(function(order){
    
    if (order.line_items !== undefined) {
      order.line_items.forEach(function(lineItem) {
        lineItem.category = findCategory(lineItem, itemVariations, items, categories);
        if (lineItem.modifiers !== undefined) {
          var modifiers = lineItem.modifiers.map(function(modifier) {
            modifier.mod_list = findModList(modifier, modLists);
            return formatModifier(requestedFields, modifier, lineItem, order);
          });
          data = data.concat(modifiers);
        }
      });
    }
  });
  
  return data;
}