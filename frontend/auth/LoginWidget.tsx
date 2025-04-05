"use client";

import { useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import OktaSignInWidget from './OktaSignInWidget';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';

interface LoginWidgetProps {
  config: {
    baseUrl: string;
    clientId: string;
    redirectUri: string;
    authParams: any;
    issuer: any;
  };
}

const LoginWidget: React.FC<LoginWidgetProps> = ({ config }) => {
  const router = useRouter();
  const { oktaAuth, authState } = useOktaAuth();
  const { setUser } = useUser();

  useEffect(() => {
    if (authState?.isAuthenticated) {
      router.push('/home');
    }
  }, [authState?.isAuthenticated, router]);

  const onSuccess = async (tokens: any) => {
    await oktaAuth.handleLoginRedirect(tokens);

    const userData = tokens.idToken?.claims;
    const accessToken = tokens.accessToken?.accessToken;

    if (userData) {
      try {
        const res = await fetch(`https://localhost:8080/api/users/check`, {
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
          }
        })
        if (!res.ok) {
          throw new Error(`Failed to check user: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        console.log("User data checked:", data);
      } catch (error) {
        console.error('Error in check user data:', error);
      }
      try {
        const res = await fetch(`https://localhost:8080/api/users/email/${userData.email}`, {
          mode: "cors",
        });
        if (!res.ok) {
          throw new Error(`Failed to fetch user: ${res.status} ${res.statusText}`);
        }
        const userByEmail = await res.json();

        setUser({ ...userByEmail.body, accessToken });
        console.log("User saved in context:", { ...userByEmail.body, accessToken });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    router.push("/home");
  };

  const onError = (err: Error) => {
    console.error('Login error:', err);
  };

  if (!authState) {
    return <div>Loading...</div>;
  }

  if (authState.isAuthenticated) {
    return <div>Redirecting to home...</div>;
  }

  return <OktaSignInWidget config={config} onSuccess={onSuccess} onError={onError} />;
};

export default LoginWidget;

