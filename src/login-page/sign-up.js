import './login-page.css';
import React, { useEffect, useState } from 'react';
import Background from '../images/test-bg.jpg'
import { Link, useNavigate } from 'react-router-dom';
import axiosConfig from '../api/axiosConfig';
import { toast } from 'react-toastify';

function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
      toast.error("Username and Password Required");
      return;
    }

    if (password !== confirmPassword) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      toast.error("Passwords do not match");
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
      toast.success('Success');
      navigate('/login');

    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          toast.error('Authentication failed. Please check your credentials.')
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
    setConfirmPassword('');
  }

  return (
    <div className='login-section'>
      <img src={Background} loading='lazy' className="login-background" alt='login-background-img' />
      <div className='login-form-container'>
        <div className="bluebox">
          <h2 className="login-text">SIGN UP</h2>
          <form className="login-form" onSubmit={(e) => loginUser(e)}>
            <div className='login-label-input'>
              <label htmlFor="email">
                Email:
              </label>
              <input
                required
                value={email}
                type="text"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className='login-label-input'>
              <label htmlFor="username">
                Username:
              </label>

              <input required value={username} type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)} />
            </div>

            <div className='login-label-input'>
              <label htmlFor="pwd">
                Password:
              </label>
              <input
                required
                value={password}
                type="password"
                id="pwd"
                name="password"
                onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className='login-label-input'>
              <label htmlFor="confirm">
                Confirm Password:
              </label>
              <input required value={confirmPassword} type="password" id="confirm" name="username" onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>

            <input type="submit" value="Sign Up" className="button" />

            <p className='login-form-catch'>
              Already have an account? {"  "}
              <Link to={"/login"}>Login</Link>
            </p>
          </form>
          {loading ? <div className='loading-call-spinner'></div> : null}
        </div>
      </div>
    </div>
  );
}

export default Signup;