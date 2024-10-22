import './login-page.css';
import React from 'react';
import login from '../images/login.png'
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div>
      <div>
        <img src={login} className="login-background"/>
        <div className="bluebox">
          <h2 className="login-text">LOG IN</h2>
          <form className="submit-form">
            <label for="username">Email:</label><br/>
            <input type="text" id="username" name="username"/><br/>
            <label for="pwd">Password:</label><br/>
            <input type="password" id="pwd" name="pwd" /><br/>
            <p id='account'>No account? <Link to={'/signup'} >Create one!</Link></p>
            <input type="submit" value="LOG IN" className="button"/>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;