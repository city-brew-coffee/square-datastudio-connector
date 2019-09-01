var cc = DataStudioApp.createCommunityConnector();

function getSchema(request) {
  switch (request.configParams.data_type) {
    case 'orders':
      return {schema: getOrdersFields().build()};
    case 'line_items':
      return {schema: getLineItemsFields().build()};
    case 'modifiers':
      return {schema: getModifiersFields().build()};
  }
}

function getData(request) {
  
  switch (request.configParams.data_type) {
      case 'orders':
      
      var requestedFields = getOrdersFields().forIds(
    request.fields.map(function(field) {
      return field.name;
    })
  );

  try {
    var apiResponse = getOrders(request);
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
      
        break;
      
    case 'line_items':
      
      var requestedFields = getLineItemsFields().forIds(
    request.fields.map(function(field) {
      return field.name;
    })
  );

  try {
    var apiResponse = getOrders(request);
    var data = getFormattedLineItems(apiResponse, requestedFields);
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
      
      break;
      
      case 'modifiers':
      
      var requestedFields = getModifiersFields().forIds(
    request.fields.map(function(field) {
      return field.name;
    })
  );

  try {
    var apiResponse = getOrders(request);
    var data = getFormattedModifiers(apiResponse, requestedFields);
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
      
      break;
  }
}


function getConfig() {
  var locations = fetchDataFromListLocationsEndpoint();
  
  var config = cc.getConfig();
  
  var ordersOption = config.newOptionBuilder()
  .setLabel("Orders")
  .setValue("orders");

var lineItemsOption = config.newOptionBuilder()
  .setLabel("Line Items")
  .setValue("line_items");
  
  var modifiersOption = config.newOptionBuilder()
  .setLabel("Modifiers")
  .setValue("modifiers");
  
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
  .addOption(ordersOption)
  .addOption(lineItemsOption)
  .addOption(modifiersOption);
  
  config.setDateRangeRequired(true);

  return config.build();
}