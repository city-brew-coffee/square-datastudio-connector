function getOrders(request) {
 var locationsGroups = [];
  var locations = request.configParams.locations.split(',');
  if (locations.length > 10) {
    for (var i=0; i<locations.length / 10; i++) {
      locationsGroups[i] = locations.slice(i * 10, (i+1) * 10);
    }
  } else {
    locationsGroups[0] = locations;
  }
  
  var orders = [];
  
  for (var group = 0; group<locationsGroups.length; group++) {
    orders = orders.concat(fetchDataFromSearchOrdersEndpoint(locationsGroups[group], request.configParams.startDate, request.configParams.endDate, undefined));
  }
  
  return orders;
}