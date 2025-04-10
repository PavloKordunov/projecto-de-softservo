
"use client";

import { useEffect, useRef } from "react";
import OktaSignIn from "@okta/okta-signin-widget";
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

interface OktaSignInWidgetProps {
  config: {
    baseUrl: string;
    clientId: string;
    redirectUri: string;
    authParams: any;
    issuer: string;
  };
  onSuccess: (tokens: any) => void;
  onError: (err: Error) => void;
}

const OktaSignInWidget: React.FC<OktaSignInWidgetProps> = ({ config, onSuccess, onError }) => {
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    if (!widgetRef.current) return;

    const widget = new OktaSignIn({
      baseUrl: config.baseUrl,
      clientId: config.clientId,
      redirectUri: config.redirectUri,
      authParams: config.authParams,
      issuer: config.issuer,
      registration: {
        preSubmit: async (postData, onSuccess, onFailure) => {
          console.log(postData);
          try {
            const response = await fetch('https://localhost:8080/api/users/create', {
              mode: "cors",
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
          onSuccess(response);
        },
      },
      features: {
        registration: true,
      },
      idps: [
        { type: 'GOOGLE', id: '0oan9t36dsavw99JZ5d7' }
      ],
      idpDisplay: 'PRIMARY',
    });

    widget
      .showSignInToGetTokens({ el: widgetRef.current })
      .then(onSuccess)
      .catch(onError);

    return () => {
      widget.remove();
    };
  }, [config, onSuccess, onError]);

  return <div ref={widgetRef} className="container mt-5 mb-5"></div>;
};

export default OktaSignInWidget;
