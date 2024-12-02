import './login-page.css';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosConfig from '../api/axiosConfig';
import Background from '../images/test-bg.jpg'
import { toast } from 'react-toastify';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/');
    }

  }, [navigate])


  const loginUser = async (e) => {
    e.preventDefault();
    if (username.trim() === '' || password.trim() === '') {
      toast.error("Username is required");
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

      localStorage.setItem('user', username);
      localStorage.setItem('auth', result.data.roles[0].authority)
      toast.success('Successfully logged in');
      navigate('/')

    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          toast.error('Authentication failed. Please check your credentials.');
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
    <div className='login-section'>
      <img src={Background} loading='lazy' className="login-background" alt='login-background-img' />
      <div className='login-form-container'>
        <div className="bluebox">
          <h2 className="login-text">LOG IN</h2>
          <form className="login-form" onSubmit={(e) => loginUser(e)}>
            <div className='login-label-input'>
              <label htmlFor="username">
                Username:
              </label>
              <input autoComplete='off' required value={username} type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)} />
            </div>

            <div className='login-label-input'>
              <label htmlFor="pwd">
                Password:
              </label>
              <input autoComplete='off' required value={password} type="password" id="pwd" name="password" onChange={(e) => setPassword(e.target.value)} />
            </div>

            <input type="submit" value="Log In" className="button" />

            <p className='login-form-catch'>
              Don't have an account? {"  "}
              <Link to={'/signup'}>Signup</Link>
            </p>
          </form>
          {loading ? <div className='loading-call-spinner'></div> : null}
        </div>
      </div>
    </div>
  );
}

export default Login;