export const oktaConfig = {
    issuer: 'https://dev-97946146.okta.com/oauth2/default',
    clientId: '0oalmv1c9zXfKRxLb5d7',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
  }
