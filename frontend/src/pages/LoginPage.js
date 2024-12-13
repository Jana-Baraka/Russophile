

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); 
    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include' 
      });
      const data = await res.json();
      console.log("Login response:", data); 
      if (res.ok) {
        alert('Logged in successfully as ' + data.role);
        if (data.role === 'Admin') {
          navigate('/admin');
        } else {
          navigate('/lessons');
        }
      } else {
        setErrorMessage(data.message || 'Login failed');
      }
    } catch (err) {
      setErrorMessage('Error logging in');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input 
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required 
          />
        </div>
        <div>
          <input 
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required 
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default LoginPage;
