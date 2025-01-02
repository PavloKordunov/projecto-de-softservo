import css from "./App.module.css";
import {OktaAuth, toRelativeUrl} from "@okta/okta-auth-js";
import Layout from "./Layout/Layout";
import {LoginCallback, SecureRoute, Security} from "@okta/okta-react";
import LoginWidget from "../Auth/LoginWidget";
import {Route, Routes, useNavigate} from "react-router-dom";
import {oktaConfig} from "../lib/oktaConfig";
import Register from "../Auth/Register";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import AdminPost from "./AdminPost/AdminPost";
import Profile from "./Profile/Profile";
import NavBar from "./NavBar/NavBar";
import AdminPage from "./pages/AdminPage";
import AdminPostMenu from "./AdminPostMenu/AdminPostMenu";
import Group from "./Group/Group";


const oktaAuth = new OktaAuth(oktaConfig);

function App() {

    const navigate = useNavigate();

    const customAuthHandler = () => {
        navigate('/login');
    };

    const restoreOriginalUri = async (_oktaAuth:any, originalUri:any) => {
        navigate(toRelativeUrl(originalUri || '/', window.location.origin));
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
                        <Route path="admin-page" element={<AdminPage />} />
                        <Route path='admin-post-menu' element={<AdminPostMenu />} />
                        <Route path="auth-page" element={<AuthPage/>}/>
                        <Route path="group" element={<Group/>}/>
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
