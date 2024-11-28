import { Security } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';
import { useNavigate } from 'react-router-dom';
import oktaConfig from './oktaConfig';

const oktaAuth = new OktaAuth(oktaConfig);

const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    navigate(originalUri || '/');
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      {children}
    </Security>
  );
};

export default AuthWrapper;
