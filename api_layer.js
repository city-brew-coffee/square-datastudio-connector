function fetchDataFromSearchOrdersEndpoint(request) {
  var locations = request.configParams.locations.split(',');
      var url = 'https://connect.squareup.com/v2/orders/search';
      var data = {
        'location_ids': locations,
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
    return response.orders;
  } else {
    cc.newUserError()
      .setDebugText('Error fetching data from API. Exception details: ' + response.errors[0])
      .setText(
        'The connector has encountered an unrecoverable error. Please try again later, or file an issue if this error persists.'
      )
      .throwException();
  }
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
  
  console.log(responseString);
  
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