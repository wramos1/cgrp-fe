import './login-page.css';
import React, { useEffect, useState } from 'react';
import loginBackground from '../images/login.png'
import { Link, useNavigate } from 'react-router-dom';
import axiosConfig from '../api/axiosConfig';

function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      alert("Logged in already");
      navigate('/');
    }

  }, [navigate])


  const loginUser = async (e) => {
    e.preventDefault();
    if (username.trim() === '' || password.trim() === '') {
      alert("Username is required");
      return;
    }

    const formData = {
      email: email,
      username: username,
      password: password,
      confirmPassword: confirmPassword,
    };

    try {
      setLoading(true);
      const result = await axiosConfig.post('/register-user', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      alert('Success');
      navigate('/login');

    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          alert('Authentication failed. Please check your credentials.')
        }
        else {
          console.error('Error', error.message)
        }
      }
    }
    finally {
      setLoading(false);
    }

    setEmail('');
    setUsername('');
    setPassword('');
    setconfirmPassword('');
  }

  return (
    <div>
      <div>
        <img src={loginBackground} className="login-background" alt='login-background-img' />
        <div className="bluebox">
          <h2 className="login-text">SIGN UP</h2>
          <form className="submit-form" onSubmit={(e) => loginUser(e)}>
          <label htmlFor="email">
              Email:
            </label>
            <br />
            <input required value={email} type="text" id="email" name="email" onChange={(e) => setEmail(e.target.value)} />
            <br />
            <label htmlFor="username">
              Username:
            </label>
            <br />
            <input required value={username} type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)} />
            <br />
            <label htmlFor="pwd">
              Password:
            </label>
            <br />
            <input required value={password} id="pwd" name="password" onChange={(e) => setPassword(e.target.value)} />
            <br />
            <label htmlFor="confirm">
              Confirm Password:
            </label>
            <br />
            <input required value={confirmPassword} id="confirm" name="username" onChange={(e) => setconfirmPassword(e.target.value)} />
            <br />
            <input disabled={loading} type="submit" value="SIGN UP" className="button" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;