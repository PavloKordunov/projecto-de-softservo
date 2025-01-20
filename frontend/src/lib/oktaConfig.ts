export default {
  oidc: {
    clientId: '0oalmv1c9zXfKRxLb5d7',
    issuer: 'https://dev-97946146.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
  },
  widget: {
    baseUrl: 'https://dev-97946146.okta.com',
    clientId: '0oalmv1c9zXfKRxLb5d7',
    redirectUri: 'http://localhost:3000/login/callback',
    authParams: {
      scopes: ['openid', 'profile', 'email'],
    },
    features: {
      registration: true,
    },
  },
};
