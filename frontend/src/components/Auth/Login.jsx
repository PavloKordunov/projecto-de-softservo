import { useOktaAuth } from '@okta/okta-react';

const Login = () => {
  const { oktaAuth } = useOktaAuth();

  const handleLogin = async () => {
    oktaAuth.signInWithRedirect();
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <button
        onClick={handleLogin}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Login with Okta
      </button>
    </div>
  );
};

export default Login;
