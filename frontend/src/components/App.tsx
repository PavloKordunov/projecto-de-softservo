import {OktaAuth, toRelativeUrl} from "@okta/okta-auth-js";
import {LoginCallback, SecureRoute, Security} from "@okta/okta-react";
import {Route, Routes, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import Layout from "./Layout/Layout";
import LoginWidget from "../Auth/LoginWidget";
import Register from "../Auth/Register";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import AdminPost from "./AdminPost/AdminPost";
import Profile from "./Profile/Profile";
import NavBar from "./NavBar/NavBar";
import {oktaConfig} from "../lib/oktaConfig";
import css from "./App.module.css";

const oktaAuth = new OktaAuth(oktaConfig);

function App() {
    const navigate = useNavigate();

    const customAuthHandler = () => {
        console.log("Redirecting to login page (unauthenticated).");
        navigate('/login');
    };

    const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
        const redirectUri = toRelativeUrl(originalUri || '/', window.location.origin);
        console.log("Restoring original URI:", redirectUri);
        navigate(redirectUri);
    };


    return (
        <div className={css.app}>
            <Security
                oktaAuth={oktaAuth}
                restoreOriginalUri={restoreOriginalUri}
                onAuthRequired={customAuthHandler}
            >
                <NavBar />
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path="auth-page" element={<AuthPage />} />
                        <Route path="adminPost" element={<AdminPost />} />
                        <Route path="userProfile" element={<Profile />} />
                    </Route>
                    <Route path="/login" element={<LoginWidget config={oktaConfig} />} />
                    <Route path="/login/callback" element={<LoginCallback />} />
                    <Route path="/register" element={
                        <SecureRoute>
                            <Register
                                onSuccess={() => console.log('User registered successfully!')}
                                onError={(err: any) => console.error('Registration error:', err)}
                            />
                        </SecureRoute>
                    } />
                </Routes>
            </Security>
        </div>
    );
}

export default App;
