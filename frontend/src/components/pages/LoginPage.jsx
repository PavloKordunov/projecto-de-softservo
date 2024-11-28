import { Link } from 'react-router-dom';

const LoginPage = () => {

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to My App</h1>
            <Link to='login'
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                }}
            >
                Login
            </Link>
            <br />
            <Link to='register'
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                }}
            >
                Register
            </Link>
        </div>
    );
};

export default LoginPage;
