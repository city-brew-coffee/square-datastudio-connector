function fetchDataFromSearchOrdersEndpoint(locations, startDate, endDate, cursor) {
  
      var url = 'https://connect.squareup.com/v2/orders/search';
      var data = {
        'location_ids': locations,
        'query': {
          'filter': {
            'date_time_filter': {
              'created_at': {
                'startAt': startDate + 'T00:00:00-06:00',
                'endAt': endDate + 'T00:00:00-06:00',
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
    if (response.cursor !== undefined) {
      return response.orders.concat(fetchDataFromSearchOrdersEndpoint(locations, startDate, endDate, response.cursor));
    } else {
      if (response.orders !== undefined) {
        return response.orders;
      } else {
        return [];
      }
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

function fetchDataFromBatchRetrieveEndpoint(objectIds) {
      var url = 'https://connect.squareup.com/v2/catalog/batch-retrieve';
  
  var data = {
        'object_ids': objectIds,
    'include_related_objects': true
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
    return response.objects.concat(response.related_objects);
  } else {
    console.error(response);
    cc.newUserError()
      .setDebugText('Error fetching data from API. Exception details: ' + response.errors[0])
      .setText(
        'The connector has encountered an unrecoverable error. Please try again later, or file an issue if this error persists.'
      )
      .throwException();
  }
}