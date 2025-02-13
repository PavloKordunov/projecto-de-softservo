"use client";

import { useOktaAuth } from '@okta/okta-react';
import OktaSignInWidget from './OktaSignInWidget';

interface LoginWidgetProps {
  config: {
    baseUrl: string;
    clientId: string;
    redirectUri: string;
    authParams: any;
    issuer: any;
  };
}

const LoginWidget: React.FC<LoginWidgetProps> = ({ config }) => {
  const { oktaAuth, authState } = useOktaAuth();

  const onSuccess = (tokens: any) => {
    oktaAuth.handleLoginRedirect(tokens);
    console.log('Login success:', tokens);
  };

  const onError = (err: Error) => {
    console.error('Login error:', err);
  };

  if (!authState) {
    return <div>Loading...</div>;
  }

  if (authState.isAuthenticated) {
    return null;
  }

  return <OktaSignInWidget config={config} onSuccess={onSuccess} onError={onError} />;
};

export default LoginWidget;