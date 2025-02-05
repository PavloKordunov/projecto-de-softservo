import { useEffect, useRef, useState } from 'react';
import OktaSignIn from '@okta/okta-signin-widget';
import { useNavigate } from 'react-router-dom';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import PrivacyPolicyPopup from '../components/PrivacyPolicyPopup/PrivacyPolicyPopup';
import RulesPopup from '../components/RulesPopup/RulesPopup';

const OktaSignInWidget = ({ config, onSuccess, onError }) => {
  const widgetRef = useRef();
  const navigate = useNavigate();
  const [showPrivacyPopup, setShowPrivacyPopup] = useState(true);
  const [widgetVisible, setWidgetVisible] = useState(false);
  const [showRulesPopup, setShowRulesPopup] = useState(false);

  const showOktaWidget = () => {
    setShowPrivacyPopup(false);
    setWidgetVisible(true);
  };

  const declinePrivacyPolicy = () => {
    setShowPrivacyPopup(false);
    navigate('/');
  };

  const acceptForumRules = () => {
    setShowRulesPopup(false);
  };

  const declineForumRules = async () => {
    setShowRulesPopup(false);
    setWidgetVisible(false);
    navigate('/');
  };

  useEffect(() => {
    if (!widgetRef.current || !widgetVisible) {
      return;
    }

    const widget = new OktaSignIn({
      baseUrl: config.widget.baseUrl,
      clientId: config.widget.clientId,
      redirectUri: config.widget.redirectUri,
      authParams: config.widget.authParams,
      registration: {
        preSubmit: async (postData, onSuccess, onFailure) => {
          console.log(postData);
          try {
            const response = await fetch('http://localhost:8080/api/users/create', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(postData),
            });
            if (response.ok) {
              const result = await response.json();
              console.log('Registration data sent successfully:', result);
              onSuccess(postData);
            } else {
              const errorResponse = await response.json();
              console.error('Backend API error:', errorResponse);
              onFailure({
                errorSummary: 'Registration failed on backend',
                errorCauses: [
                  {
                    errorSummary: 'Check your data',
                    property: 'customField',
                  },
                ],
              });
            }
          } catch (error) {
            console.error('Error sending registration data:', error);
            onFailure({
              errorSummary: 'Network or server error',
              errorCauses: [
                {
                  errorSummary: 'Unable to connect to backend',
                },
              ],
            });
          }
        },
        postSubmit: async (response, onSuccess, onFailure) => {
          console.log('Post submit response:', response);
          setShowRulesPopup(true);
          onSuccess(response);
        },
      },
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
  }, [config, widgetVisible, onSuccess, onError]);

  return (
      <div className="container mt-5 mb-5">
        {showPrivacyPopup && (
            <PrivacyPolicyPopup
                onAccept={showOktaWidget}
                onDecline={declinePrivacyPolicy}
            />
        )}
        {showRulesPopup && (
            <RulesPopup
                onAccept={acceptForumRules}
                onDecline={declineForumRules}
            />
        )}
        <div ref={widgetRef}></div>
      </div>
  );
};

export default OktaSignInWidget;