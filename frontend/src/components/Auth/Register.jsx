import React, { useState } from 'react';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        const user = {
            profile: {
                firstName: username.split(' ')[0],
                lastName: username.split(' ')[1] || '',
                email,
                login: email,
            },
            credentials: {
                password: { value: password },
            },
        };

        try {
            const response = await fetch('https://dev-37537562.okta.com/api/v1/users?activate=true', {
                method: 'POST',
                headers: {
                    'Authorization': `00f34g-4rIFKCBMYhTZj1lRJLJVWYu0g-o8kOT5Nua`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                alert('Registration successful! Please check your email for verification.');
                setUsername('');
                setEmail('');
                setPassword('');
            } else {
                const errorData = await response.json();
                setError(errorData.errorSummary || 'An error occurred.');
            }
        } catch (err) {
            console.error(err);
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Full Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ padding: '10px', marginBottom: '10px' }}
                />
                <br />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ padding: '10px', marginBottom: '10px' }}
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ padding: '10px', marginBottom: '10px' }}
                />
                <br />
                <button type="submit" style={{ padding: '10px 20px' }} disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Register;
