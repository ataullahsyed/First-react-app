//npm init vite animal-farm/study-buddy

import React, { useState } from 'react';
import './App.css';
import SB from './assets/SB.svg';

const mockLogin = async (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'demo' && password === 'password') {
        resolve({ username, name: 'Demo User', course: 'Sample Course' });
      } else {
        reject(new Error('Invalid username or password'));
      }
    }, 1000);
  });
};

const mockSignup = async (formData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ success: true, message: 'User registered successfully' });
    }, 1000);
  });
};

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await mockLogin(username, password);
      console.log('Login successful', user);
      setLoginError('');
    } catch (error) {
      console.error('Login failed', error.message);
      setLoginError('Invalid username or password');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <p className="error-message">{loginError}</p>
      <button type="submit">Login</button>
    </form>
  );
}

function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    course: '',
    university: '',
    dateOfBirth: '',
  });
  const [signupSuccess, setSignupSuccess] = useState('');
  const [signupError, setSignupError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await mockSignup(formData);
      console.log('Signup successful', response);
      setSignupSuccess('User registered successfully');
      setSignupError('');
    } catch (error) {
      console.error('Signup failed', error.message);
      setSignupError('Signup failed. Please try again.');
      setSignupSuccess('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <h2>Sign Up</h2>
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
      <input type="text" name="course" placeholder="Course" value={formData.course} onChange={handleChange} required />
      <input type="text" name="university" placeholder="University" value={formData.university} onChange={handleChange} required />
      <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
      <p className="success-message">{signupSuccess}</p>
      <p className="error-message">{signupError}</p>
      <button type="submit">Sign Up</button>
    </form>
  );
}

function App() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="App">
      <header>
        <div className="logo">
          <img alt="logo" className="logo-img" src={SB} />
          <span>
            <h2 className="head">Study-Buddy</h2>
          </span>
        </div>
        <button onClick={() => setShowLogin(!showLogin)}>
          {showLogin ? 'Switch to Sign Up' : 'Switch to Login'}
        </button>
      </header>
      {showLogin ? <LoginPage /> : <SignupPage />}

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Study-Buddy. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

