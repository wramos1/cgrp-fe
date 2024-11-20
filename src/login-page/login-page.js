import './login-page.css';
import React, { useEffect, useState } from 'react';
import loginBackground from '../images/login.png'
import { Link, useNavigate } from 'react-router-dom';
import axiosConfig from '../api/axiosConfig';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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

    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    try {
      setLoading(true);
      const result = await axiosConfig.post('/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })

      console.log('Login successful', result.data.roles[0].authority)
      localStorage.setItem('user', username);
      localStorage.setItem('auth', result.data.roles[0].authority)
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
    finally {
      setLoading(false);
    }


    setUsername('');
    setPassword('');
  }

  return (
    <div>
      <div>
        <img src={loginBackground} className="login-background" alt='login-background-img' />
        <div className="bluebox">
          <h2 className="login-text">LOG IN</h2>
          <form className="submit-form" onSubmit={(e) => loginUser(e)}>
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
            <p id='account'>
              No account?
              <Link to={'/signup'} >Create one!</Link>
            </p>
            <input disabled={loading} type="submit" value="LOG IN" className="button" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;