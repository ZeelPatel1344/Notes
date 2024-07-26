import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { login } from './authService';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const onButtonClick = async () => {
    try {
      const response = await login(email, password);
      localStorage.setItem('token', response.token);
      localStorage.setItem('refreshToken', response.refreshToken);
      // toast.success('Welcome to Keeper App');
      if(!email)
      {
        toast.error("Please enter email id");
        return;
      }
      else if(!password)
      {
        toast.error("Please enter Password");
        return;
      }
      navigate('/', { state: { loggedIn: true } });
    } catch (error) {
      toast.error('Invalid Email Id or Password');
      // setEmailError(error.msg);
    }
  };

  useEffect(() => {
    if (location.state?.loggedout) {
      toast.success('Successfully logged out!');
    }
  }, [location.state?.loggedout]);

  return (
    <>
      <h2 className="header" id="full">Notes
        <div className="navblock">
          {/* <Link className="nav" to="/">Home</Link> */}
          <Link style={{ marginLeft: "120px" }} className="nav" to="/login">Login</Link>
          <Link style={{ marginLeft: "200px" }} className="nav" to="/register">Register</Link>
        </div>
      </h2>
      <div className={'mainContainer'}>
        <div className={'titleContainer'}>Login</div>
        <br />
        <div className={'inputContainer'}>
          <input
            type='email'
            value={email}
            placeholder="Enter your email here"
            onChange={(ev) => setEmail(ev.target.value)}
            className={'inputBox'}
          />
          <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        <div className={'inputContainer'}>
          <input
            type='password'
            value={password}
            placeholder="Enter your password here"
            onChange={(ev) => setPassword(ev.target.value)}
            className={'inputBox'}
          />
          <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        <div className={'inputContainer'}>
          <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
          <Toaster position='bottom-right' />
        </div>
      </div>
    </>
  );
};

export default Login;
