import './login-page.css';
import React from 'react';
import login from '../images/login.png'

function Signup() {
  return (
    <div>
      <div>
        <img src={login} className="login-background"/>
        <div className="bluebox">
          <h2 className="login-text">SIGN UP</h2>
          <form className="submit-form">
            <label for="username">Username:</label><br/>
            <input type="text" id="username" name="username"/><br/>
            <label for="email">Email:</label><br/>
            <input type="text" id="email" name="email"/><br/>
            <label for="pwd">Password:</label><br/>
            <input type="password" id="pwd" name="pwd" /><br/>
            <label for="confirmpwd">Confirm Password:</label><br/>
            <input type="password" id="confirmpwd" name="confirmpwd" /><br/>
            <input type="submit" value="REGISTER" className="button"/>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;