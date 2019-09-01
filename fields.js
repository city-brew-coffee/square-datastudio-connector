function getOrdersFields() {
  var fields = cc.getFields();
  var types = cc.FieldType;
  var aggregations = cc.AggregationType;

  fields
    .newDimension()
    .setId('location')
    .setName('Location Nickname')
    .setType(types.TEXT);
  
  fields
    .newDimension()
    .setId('locationState')
    .setName('Location State')
    .setType(types.REGION);
  
  fields
    .newDimension()
    .setId('locationCity')
    .setName('Location City')
    .setType(types.CITY);
  
  fields
    .newDimension()
    .setId('locationAddressLine1')
    .setName('Location Address Line 1')
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

function getLineItemsFields() {
  var fields = cc.getFields();
  var types = cc.FieldType;
  var aggregations = cc.AggregationType;
  
  // fields from the order layer

  fields
    .newDimension()
    .setId('location')
    .setName('Location Nickname')
    .setType(types.TEXT);
  
  fields
    .newDimension()
    .setId('locationState')
    .setName('Location State')
    .setType(types.REGION);
  
  fields
    .newDimension()
    .setId('locationCity')
    .setName('Location City')
    .setType(types.CITY);
  
  fields
    .newDimension()
    .setId('locationAddressLine1')
    .setName('Location Address Line 1')
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
    .setId('state')
    .setName('State')
    .setType(types.TEXT);
  
  // fields from the line item layer
  
  fields
    .newDimension()
    .setId('category')
    .setName('Category')
    .setType(types.TEXT);
  
  fields
    .newDimension()
    .setId('name')
    .setName('Item Name')
    .setType(types.TEXT);
  
  fields
    .newDimension()
    .setId('variationName')
    .setName('Variation Name')
    .setType(types.TEXT);
  
  fields
    .newDimension()
    .setId('note')
    .setName('Note')
    .setType(types.TEXT);
  
  fields
    .newDimension()
    .setId('unit')
    .setName('Unit')
    .setType(types.TEXT);
  
  fields
    .newMetric()
    .setId('quantity')
    .setName('Quantity')
    .setType(types.NUMBER)
    .setAggregation(aggregations.SUM)
    .setDescription('The quantity purchased.')
    .setGroup('Money');
  
  fields
    .newMetric()
    .setId('basePriceMoney')
    .setName('Base Price Money')
    .setType(types.CURRENCY_USD)
    .setAggregation(aggregations.SUM)
    .setDescription('The base price for a single unit of the line item.')
    .setGroup('Money');
  
  fields
    .newMetric()
    .setId('grossSalesMoney')
    .setName('Gross Sales Money')
    .setType(types.CURRENCY_USD)
    .setAggregation(aggregations.SUM)
    .setDescription('The amount of money made in gross sales for this line item. Calculated as the sum of the variation\'s total price and each modifier\'s total price.')
    .setGroup('Money');
  
  fields
    .newMetric()
    .setId('totalDiscountMoney')
    .setName('Total Discount Money')
    .setType(types.CURRENCY_USD)
    .setAggregation(aggregations.SUM)
    .setDescription('The total discount amount of money to collect for the line item.')
    .setGroup('Money');
  
  fields
    .newMetric()
    .setId('totalTaxMoney')
    .setName('Total Tax Money')
    .setType(types.CURRENCY_USD)
    .setAggregation(aggregations.SUM)
    .setDescription('The total tax amount of money to collect for the line item.')
    .setGroup('Money');
  
  fields
    .newMetric()
    .setId('totalMoney')
    .setName('Total Money')
    .setType(types.CURRENCY_USD)
    .setAggregation(aggregations.SUM)
    .setDescription('The total amount of money to collect for this line item.')
    .setGroup('Money');
  
  fields
    .newMetric()
    .setId('variationTotalPriceMoney')
    .setName('Total Tax Money')
    .setType(types.CURRENCY_USD)
    .setAggregation(aggregations.SUM)
    .setDescription('The total price of all item variations sold in this line item. Calculated as base_price_money multiplied by quantity. Does not include modifiers.')
    .setGroup('Money');
  

  return fields;
}

function getModifiersFields() {
  var fields = cc.getFields();
  var types = cc.FieldType;
  var aggregations = cc.AggregationType;
  
  // fields from the order layer

  fields
    .newDimension()
    .setId('location')
    .setName('Location Nickname')
    .setType(types.TEXT);
  
  fields
    .newDimension()
    .setId('locationState')
    .setName('Location State')
    .setType(types.REGION);
  
  fields
    .newDimension()
    .setId('locationCity')
    .setName('Location City')
    .setType(types.CITY);
  
  fields
    .newDimension()
    .setId('locationAddressLine1')
    .setName('Location Address Line 1')
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
    .setId('state')
    .setName('State')
    .setType(types.TEXT);
  
  // fields from the line item layer
  
  fields
    .newDimension()
    .setId('category')
    .setName('Category')
    .setType(types.TEXT);
  
  fields
    .newDimension()
    .setId('itemName')
    .setName('Item Name')
    .setType(types.TEXT);
  
  fields
    .newDimension()
    .setId('variationName')
    .setName('Variation Name')
    .setType(types.TEXT);
  
  fields
    .newDimension()
    .setId('unit')
    .setName('Unit')
    .setType(types.TEXT);
  
  fields
    .newMetric()
    .setId('quantity')
    .setName('Quantity')
    .setType(types.NUMBER)
    .setAggregation(aggregations.SUM)
    .setDescription('The quantity purchased.');
  
  // add fields from modifier layer
  
  fields
    .newDimension()
    .setId('name')
    .setName('Modifier Name')
    .setType(types.TEXT);
  
  fields
    .newDimension()
    .setId('mod_list')
    .setName('Modifier List')
    .setType(types.TEXT);
  
   fields
    .newMetric()
    .setId('basePriceMoney')
    .setName('Base Price')
    .setType(types.CURRENCY_USD)
    .setAggregation(aggregations.SUM)
    .setDescription('The base price for the modifier.')
    .setGroup('Money');
  
   fields
    .newMetric()
    .setId('totalPriceMoney')
    .setName('Total Price')
    .setType(types.CURRENCY_USD)
    .setAggregation(aggregations.SUM)
    .setDescription('The total price of the item modifier for its line item. This is the modifier\'s base_price_money multiplied by the line item\'s quantity.')
    .setGroup('Money');
  

  return fields;
}