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