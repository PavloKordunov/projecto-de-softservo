



import {OktaAuth, toRelativeUrl} from "@okta/okta-auth-js";

import {LoginCallback, SecureRoute, Security} from "@okta/okta-react";
import LoginWidget from "../Auth/LoginWidget";
import {Route, Switch, useHistory} from "react-router-dom";
import {oktaConfig} from "../lib/oktaConfig";
import Register from "../Auth/Register";

const oktaAuth = new OktaAuth(oktaConfig);

function App() {
    const customAuthHandler = () => {
        history.push('/login');
    }

    const history = useHistory();

    const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
        history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
    };
    return (
        <>
        <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
        <Switch>
            {/*<Route path="/" element={<Loyout />} >*/}
                {/*<Route index element={<HomePage />} />*/}
                {/*<Route index element={<LoginPage />} />*/}
                {/*<Route path="register" element={<Register/>}/>*/}
                {/*/!*<Route path="login" element={<Login/>}/>*!/*/}
                {/*<Route path="/callback" element={<Callback />} />*/}
                {/*<Route path='adminPost' element={<AdminPost />} />*/}
                {/*<Route path='userProfile' element={<Profile/>}/>*/}
            <Route path='/login' render={
                () => <LoginWidget config={oktaConfig} />
            }
            />
                <Route path='/login/callback' component={LoginCallback} />
                <SecureRoute path='/register'><Register/> </SecureRoute>
            {/*</Route>*/}
        </Switch>
        </Security>
        </>
    );
}

export default App;
