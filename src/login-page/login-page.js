import './login-page.css';
import React, { useState } from 'react';
import loginBackground from '../images/login.png'
import { Link, useNavigate } from 'react-router-dom';
import axiosConfig from '../api/axiosConfig';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    if (username.trim() === '' || password.trim() === '') {
      alert("Username is required");
      return;
    }

    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    try {
      const result = await axiosConfig.post('/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      console.log('Login successful', result.data)
      alert('Success');
      navigate('/')

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


    setUsername('');
    setPassword('');
  }

  return (
    <div>
      <div>
        <img src={loginBackground} className="login-background" />
        <div className="bluebox">
          <h2 className="login-text">LOG IN</h2>
          <form className="submit-form" onSubmit={(e) => loginUser(e)}>
            <label for="username">
              Username:
            </label>
            <br />
            <input required value={username} type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)} />
            <br />
            <label for="pwd">
              Password:
            </label>
            <br />
            <input required value={password} type='password' id="pwd" name="password" onChange={(e) => setPassword(e.target.value)} />
            <br />
            <p id='account'>
              No account?
              <Link to={'/signup'} >Create one!</Link>
            </p>
            <input type="submit" value="LOG IN" className="button" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;