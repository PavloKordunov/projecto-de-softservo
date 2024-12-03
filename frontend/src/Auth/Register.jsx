import { useEffect, useRef } from 'react';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import { oktaConfig } from "../lib/oktaConfig";

const Register = ({ onSuccess, onError }) => {
    const widgetRef = useRef();

    useEffect(() => {
        if (!widgetRef.current) {
            return false;
        }

        const widget = new OktaSignIn({
            ...oktaConfig,
            features: {
                registration: true, // Увімкнути функцію реєстрації
            },
            registration: {
                parseSchema: (schema, onSuccess, onFailure) => {
                    // Можна кастомізувати форму реєстрації
                    onSuccess(schema);
                },
                preSubmit: (postData, onSuccess, onFailure) => {
                    // Використовується для перевірки даних перед відправкою
                    onSuccess(postData);
                },
                postSubmit: (response, onSuccess, onFailure) => {
                    // Використовується для обробки після відправки
                    onSuccess(response);
                },
            },
        });

        widget.showSignInAndRedirect({
            el: widgetRef.current,
        }).then(onSuccess).catch(onError);

        return () => widget.remove();
    }, [onSuccess, onError]);

    return (
        <div className='container mt-5 mb-5'>
            <div ref={widgetRef}></div>
        </div>
    );
};

export default Register;
