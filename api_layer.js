function fetchDataFromSearchOrdersEndpoint(request, cursor) {
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
      var url = 'https://connect.squareup.com/v2/orders/search';
      var data = {
        'location_ids': locationsGroups[group],
        'query': {
          'filter': {
            'date_time_filter': {
              'created_at': {
                'startAt': request.dateRange.startDate + 'T00:00:00-06:00',
                'endAt': request.dateRange.endDate + 'T00:00:00-06:00',
              }
            }
          },
          'sort': {
            'sort_field': 'CREATED_AT'
          }
        }
      };
  if (cursor !== undefined) {
    data.cursor = cursor;
  }
      var options = {
        'method' : 'post',
        'contentType': 'application/json',
        'payload' : JSON.stringify(data),
        'headers': {
          'Authorization': 'Bearer ' + getOAuthService().getAccessToken()
        },
      };
  
  var responseString = UrlFetchApp.fetch(url, options);
  
  var response = JSON.parse(responseString); 
   
  if (response.errors === undefined) {
    if (response.orders !== undefined) {
      orders = orders.concat(response.orders);
    }
  } else {
    console.error(response.errors[0]);
    cc.newUserError()
      .setDebugText('Error fetching data from API. Exception details: ' + response.errors[0])
      .setText(
        'The connector has encountered an unrecoverable error. Please try again later, or file an issue if this error persists.'
      )
      .throwException();
  }
  }
 

  return orders;
  
}

function fetchDataFromListLocationsEndpoint() {
      var url = 'https://connect.squareup.com/v2/locations';
      var options = {
        'method' : 'get',
        'headers': {
          'Authorization': 'Bearer ' + getOAuthService().getAccessToken()
        },
      };
  
  var responseString = UrlFetchApp.fetch(url, options);
  
  var response = JSON.parse(responseString);
  
  if (response.errors === undefined) {
    return response.locations;
  } else {
    cc.newUserError()
      .setDebugText('Error fetching data from API. Exception details: ' + response.errors[0])
      .setText(
        'The connector has encountered an unrecoverable error. Please try again later, or file an issue if this error persists.'
      )
      .throwException();
  }
}

function fetchDataFromRetrieveCustomersEndpoint(custId) {
      var url = 'https://connect.squareup.com/v2/customers/' + custId;
      var options = {
        'method' : 'get',
        'headers': {
          'Authorization': 'Bearer ' + getOAuthService().getAccessToken()
        },
      };
  
  var responseString = UrlFetchApp.fetch(url, options);
  
  var response = JSON.parse(responseString);
  
  if (response.errors === undefined) {
    return response.locations;
  } else {
    cc.newUserError()
      .setDebugText('Error fetching data from API. Exception details: ' + response.errors[0])
      .setText(
        'The connector has encountered an unrecoverable error. Please try again later, or file an issue if this error persists.'
      )
      .throwException();
  }
}