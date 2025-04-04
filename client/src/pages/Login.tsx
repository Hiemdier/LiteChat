import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from 'react-router-dom';

import Auth from '../utils/auth';  // Import the Auth utility for managing authentication state
import { login } from "../api/authAPI";  // Import the login function from the API
import { UserLogin } from "../interfaces/UserLogin";  // Import the interface for UserLogin

const Login = () => {
  const navigate = useNavigate();
  // State to manage the login form data
  const [loginData, setLoginData] = useState<UserLogin>({
    username: '',
    password: ''
  });

  const [errMessage, setErrMessage] = useState<string>('');

  // Handle changes in the input fields
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  // Handle form submission for login
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Call the login API endpoint with loginData
      const data = await login(loginData);
      // If login is successful, call Auth.login to store the token in localStorage
      Auth.login(data.token);
      navigate('/');
      window.location.reload();
    } catch (err) {
      setErrMessage('Failed to login!');
      setTimeout(() => {
        setErrMessage('');
      }, 3000);
      console.error('Failed to login', err);  // Log any errors that occur during login
    }
  };

  return (
    <div className='form-container'>
      <form className='form login-form' onSubmit={handleSubmit}>
        <h1 className='text-white'>Login</h1>
        <p className='text-white'>{errMessage}</p>
        {/* Username input field */}
        <div className="form-group">
          <label className='text-white'>Username</label>
          <input 
            className="form-input"
            type='text'
            name='username'
            placeholder='Enter your username'
            value={loginData.username || ''}
            onChange={handleChange}
          />
        </div>
        {/* Password input field */}
        <div className="form-group">
          <label className='text-white'>Password</label>
          <input 
            className="form-input"
            type='password'
            name='password'
            placeholder='Enter your password'
            value={loginData.password || ''}
            onChange={handleChange}
          />
        </div>
        {/* Submit button for the login form */}
        <div className="form-group">
          <button className="btn btn-primary" type='submit'>Login</button>
        </div>
      </form>
    </div>
  )
};

export default Login;
