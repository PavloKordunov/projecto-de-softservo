import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function handleCallback() {
      try {
        const response = await fetch('http://localhost:8080/login/callback', {
          credentials: 'include',
        });

        if (response.ok) {
          navigate('/');
        } else {
          console.error('Callback failed');
        }
      } catch (err) {
        console.error('Error during callback:', err);
      }
    }
    handleCallback();
  }, [navigate]);

  return <p>Loading...</p>;
};

export default Callback;
