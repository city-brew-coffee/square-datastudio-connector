/**
 * Returns the Auth Type of this connector.
 * @return {object} The Auth type.
 */
function getAuthType() {
  var cc = DataStudioApp.createCommunityConnector();
  return cc.newAuthTypeResponse()
    .setAuthType(cc.AuthType.OAUTH2)
    .build();
}

/**
 * Resets the auth service.
 */
function resetAuth() {
  getOAuthService().reset();
}

/**
 * Returns true if the auth service has access.
 * @return {boolean} True if the auth service has access.
 */
function isAuthValid() {
  return getOAuthService().hasAccess();
}

/**
 * Returns the configured OAuth Service.
 * @return {Service} The OAuth Service
 */
function getOAuthService() {
  return OAuth2.createService('squareOAuthService')
    .setAuthorizationBaseUrl('https://connect.squareup.com/oauth2/authorize')
    .setTokenUrl('https://connect.squareup.com/oauth2/token')
    .setClientId('sq0idp-heojbEcWiAoqBUB5kh0bOA')
    .setClientSecret('sq0csp-qMhwmMvo6gKlITtRPP3fwxdii4tPwBrDD4edjSPFx7c')
    .setPropertyStore(PropertiesService.getUserProperties())
    .setCallbackFunction('authCallback')
    .setScope('MERCHANT_PROFILE_READ PAYMENTS_READ SETTLEMENTS_READ BANK_ACCOUNTS_READ ORDERS_READ CUSTOMERS_READ EMPLOYEES_READ INVENTORY_READ ITEMS_READ TIMECARDS_READ TIMECARDS_SETTINGS_READ');
};

/**
 * The OAuth callback.
 * @param {object} request The request data received from the OAuth flow.
 * @return {HtmlOutput} The HTML output to show to the user.
 */
function authCallback(request) {
  var authorized = getOAuthService().handleCallback(request);
  if (authorized) {
    return HtmlService.createHtmlOutput('Success! You can close this tab.');
  } else {
    return HtmlService.createHtmlOutput('Denied. You can close this tab');
  };
};

function get3PAuthorizationUrls() {
  return getOAuthService().getAuthorizationUrl();
}

function isAdminUser() {
  return true;
}