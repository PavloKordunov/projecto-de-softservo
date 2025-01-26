import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import PrivacyPolicyPopup from '../components/PrivacyPolicyPopup/PrivacyPolicyPopup';

const OktaSignInWidget = ({ config, onSuccess, onError }) => {
  const widgetRef = useRef();
  const [showPopup, setShowPopup] = useState(true);
  const [canProceed, setCanProceed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!widgetRef.current || !canProceed) {
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

    widget
        .showSignInToGetTokens({
          el: widgetRef.current,
        })
        .then(onSuccess)
        .catch(onError);

    return () => widget.remove();
  }, [config, onSuccess, onError, canProceed]);

  const handleDecline = () => {
    setShowPopup(false);
    navigate('/');
  };

  const handleAccept = () => {
    setShowPopup(false);
    setCanProceed(true);
  };

  return (
      <div className="container mt-5 mb-5">
        {showPopup && (
            <PrivacyPolicyPopup
                onAccept={handleAccept}
                onDecline={handleDecline}
            />
        )}
        {canProceed && <div ref={widgetRef}></div>}
      </div>
  );
};

export default OktaSignInWidget;





