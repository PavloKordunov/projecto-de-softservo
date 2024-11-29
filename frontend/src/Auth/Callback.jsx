import React, { useEffect } from 'react';
import { OktaAuth } from '@okta/okta-auth-js';

const oktaAuth = new OktaAuth({
  issuer: 'https://dev-37537562.okta.com/oauth2/default',
  clientId: 'PvjDd2ZdD66T8jj9KcSsGGfFxqx2WAke',
  redirectUri: window.location.origin + '/callback',
});

const Callback = () => {
  useEffect(() => {
    async function handleAuth() {
      try {
        const tokens = await oktaAuth.token.parseFromUrl();
        oktaAuth.tokenManager.setTokens(tokens);
        window.location.replace('/');
      } catch (err) {
        console.error('Error handling auth callback', err);
      }
    }
    handleAuth();
  }, []);

  return <p>Loading...</p>;
};

export default Callback;

