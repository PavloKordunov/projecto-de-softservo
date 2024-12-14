import { useEffect, useRef } from 'react';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import {oktaConfig} from "../lib/oktaConfig";

const OktaSignInWidget = ({ onSuccess, onError }) => {
    const widgetRef = useRef();

    useEffect(() => {
        if (!widgetRef.current) {
            console.log("Widget reference not found.");
            return;
        }

        console.log("Initializing Okta Sign-In Widget.");
        const widget = new OktaSignIn(oktaConfig);

        widget.showSignInToGetTokens({
            el: widgetRef.current,
        }).then((tokens) => {
            console.log("Tokens received:", tokens);
            onSuccess(tokens);
        }).catch((err) => {
            console.error("Error during widget initialization:", err);
            onError(err);
        });

        return () => {
            console.log("Cleaning up Okta Sign-In Widget.");
            widget.remove();
        };
    }, [onSuccess, onError]);

    return (
        <div className='container mt-5 mb-5'>
            <div ref={widgetRef}></div>
        </div>
    );
};

export default OktaSignInWidget;
