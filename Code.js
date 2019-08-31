var cc = DataStudioApp.createCommunityConnector();


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