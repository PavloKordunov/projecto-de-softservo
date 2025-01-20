import { useEffect, useRef } from 'react';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

const OktaSignInWidget = ({ config, onSuccess, onError }) => {
  const widgetRef = useRef();

  useEffect(() => {
    if (!widgetRef.current) {
      return;
    }

    const widget = new OktaSignIn({
      baseUrl: config.widget.baseUrl,
      clientId: config.widget.clientId,
      redirectUri: config.widget.redirectUri,
      authParams: config.widget.authParams,
      features: {
        registration: true,
      },
    });

    widget.showSignInToGetTokens({
      el: widgetRef.current,
    })
      .then(onSuccess)
      .catch(onError);

    return () => widget.remove();
  }, [config, onSuccess, onError]);

  return <div className="container mt-5 mb-5"><div ref={widgetRef}></div></div>;
};

export default OktaSignInWidget;
