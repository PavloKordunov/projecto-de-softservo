export const oktaConfig = {
    issuer: 'https://dev-97946146.okta.com/oauth2/default',
    clientId: '0oal5nlps8h2MvB3M5d7',
    redirectUri: 'http://localhost:8080/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
  }
  