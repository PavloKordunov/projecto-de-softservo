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

  const sendUser = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/users/create', {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: user
      })
      const data = res.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const onSuccess = (tokens) => {
      oktaAuth.handleLoginRedirect(tokens);
      // setUser({
      //   name: tokens.idToken.claims.name,
      //   username: tokens.idToken.claims.nick,
      //   email: tokens.idToken.claims.email
      // })
  
      // sendUser()
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

