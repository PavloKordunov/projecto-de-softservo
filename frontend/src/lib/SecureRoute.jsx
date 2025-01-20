import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";

const SecureRoute = () => {
    const { authState } = useOktaAuth();

    if (!authState) {
        return <div>Loading...</div>;
    }

    return authState.isAuthenticated ? <Outlet /> : <Navigate to="/register" replace />;
};

export default SecureRoute;