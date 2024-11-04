import './login-page.css';
import React, { useState } from 'react';
import loginBackground from '../images/login.png'
import { Link } from 'react-router-dom';
import axiosConfig from '../api/axiosConfig';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();
    if (username.trim() === '' || password.trim() === '') {
      alert("Username is required");
      return;
    }

    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);


    const result = await axiosConfig.post('/login', formData);


    setUsername('');
    setPassword('');

    console.log(result)
  }

  return (
    <div>
      <div>
        <img src={login} className="login-background" />
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
            <input required value={password} id="pwd" name="password" onChange={(e) => setPassword(e.target.value)} />
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