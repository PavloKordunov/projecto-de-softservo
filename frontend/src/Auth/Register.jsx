import { useEffect, useRef } from 'react';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import oktaConfig from '../lib/oktaConfig';

const Register = ({ onSuccess, onError }) => {
  const widgetRef = useRef(null);

  useEffect(() => {
    const signIn = new OktaSignIn({
      baseUrl: oktaConfig.widget.baseUrl,
      clientId: oktaConfig.widget.clientId,
      redirectUri: oktaConfig.widget.redirectUri,
      authParams: {
        scopes: ['openid', 'profile', 'email'],
      },
      features: {
        registration: true, // Enable registration
      },
    });

    if (widgetRef.current) {
      signIn.renderEl(
        { el: widgetRef.current },
        (res) => {
          if (res.status === 'SUCCESS') {
            onSuccess(res.tokens);
          }
        },
        (err) => {
          console.error('Error during registration:', err);
          onError(err);
        }
      );
    }

    return () => signIn.remove();
  }, [onSuccess, onError]);

  return <div ref={widgetRef} style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }} />;
};

export default Register;
