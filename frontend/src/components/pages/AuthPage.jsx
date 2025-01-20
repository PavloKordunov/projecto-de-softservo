import React from 'react';
import { Link } from 'react-router-dom';

const AuthPage = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h1>Welcome to My Forum</h1>
    <Link to="/login" style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', marginBottom: '10px', display: 'inline-block' }}>
      Login
    </Link>
    <br />
    <Link to="/register" style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
      Register
    </Link>
  </div>
);

export default AuthPage;
