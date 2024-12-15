import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AuthPage.css'; 
import RussoImage from '../assets/images/russo.png';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const themes = [
    {
      background: "#1a1a2e",
      color: "#ffffff",
      primaryColor: "#0f3460"
    },
    {
      background: "#461220",
      color: "#ffffff",
      primaryColor: "#e94560"
    },
    {
      background: "#192a51",
      color: "#ffffff",
      primaryColor: "#967aa1"
    },
    {
      background: "#f7b267",
      color: "#000000",
      primaryColor: "#f4845f"
    },
    {
      background: "#f25f5c",
      color: "#000000",
      primaryColor: "#642b36"
    },
    {
      background: "#231f20",
      color: "#fff",
      primaryColor: "#bb4430"
    }
  ];

  const setTheme = (theme) => {
    const root = document.querySelector(":root");
    root.style.setProperty("--background", theme.background);
    root.style.setProperty("--color", theme.color);
    root.style.setProperty("--primary-color", theme.primaryColor);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!username.trim() || !password.trim()) {
      setErrorMessage('Username and Password cannot be empty');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include' 
      });
      const data = await res.json();
      console.log("Register response:", data);
      if (res.ok) {
        alert('Registered successfully! Please login.');
        navigate('/'); 
      } else {
        setErrorMessage(data.message || 'Registration failed');
      }
    } catch (err) {
      setErrorMessage('Error registering');
      console.error(err);
    }
  };

  return (
    <section className="container">
      <div className="auth-container"> 
        <div className="circle circle-one"></div>
        <div className="form-container">
        <img src={RussoImage} alt="illustration" className="illustration" />
          <h1 className="opacity">REGISTER</h1>
          <form onSubmit={handleRegister}>
            <input 
              type="text" 
              placeholder="USERNAME"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
            <input 
              type="password" 
              placeholder="PASSWORD"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button className="opacity" type="submit">SUBMIT</button> 
          </form>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <div className="register-forget opacity">
            <a href="/login">LOGIN</a>
          </div>
        </div>
        <div className="circle circle-two"></div>
      </div>
      <div className="theme-btn-container"></div>
    </section>
  );
}

export default RegisterPage;
