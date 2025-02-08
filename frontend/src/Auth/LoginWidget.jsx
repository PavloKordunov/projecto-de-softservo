import { useNavigate } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import OktaSignInWidget from './OktaSignInWidget';
import { useEffect, useState } from 'react';

const LoginWidget = ({ config }) => {
  const { oktaAuth, authState } = useOktaAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name:'',
    username:'',
    email:''
  })

  const onSuccess = (tokens) => {
      oktaAuth.handleLoginRedirect(tokens);

      console.log('Login success:', tokens)
  };

  const onError = (err) => {
    console.error('Login error:', err);
  };

  if (!authState) {
    return <div>Loading...</div>;
  }

  if (authState.isAuthenticated) {
    navigate('/');
    return null;
  }

  return <OktaSignInWidget config={config} onSuccess={onSuccess} onError={onError} />;
};

export default LoginWidget;

