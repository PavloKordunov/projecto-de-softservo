import { useNavigate } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import OktaSignInWidget from './OktaSignInWidget';

const LoginWidget = ({ config }) => {
    const { oktaAuth, authState } = useOktaAuth();
    const navigate = useNavigate();

    const onSuccess = (tokens) => {
        console.log("Login successful. Tokens:", tokens);
        oktaAuth.handleLoginRedirect(tokens);
    };

    const onError = (err) => {
        console.error("Sign in error:", err);
    };

    if (!authState) {
        console.log("Loading authentication state...");
        return <div>Loading...</div>;
    }

    if (authState.isAuthenticated) {
        console.log("User is authenticated, redirecting to home page.");
        navigate('/');
        return null;
    }

    return <OktaSignInWidget config={config} onSuccess={onSuccess} onError={onError} />;
};

export default LoginWidget;
