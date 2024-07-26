import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from './authService';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const navigate = useNavigate();

  const onButtonClick = async () => {
    if (password !== confirmPassword) {
      toast.error("Email id and password does not match");
      return;
    }

    try {
      await register(email, password);
      navigate('/login');
    } catch (error) {
      toast.error('Email already exist');
      // setEmailError(error.msg || 'Registration failed');
    }
  };

  return (
    <>
    <Toaster position='bottom-right' />
      <h2 className="header" id="full">Notes
        <div className="navblock">
          {/* <Link className="nav" to="/">Home</Link> */}
          <Link style={{ marginLeft: "120px" }} className="nav" to="/login">Login</Link>
          <Link style={{ marginLeft: "200px" }} className="nav" to="/register">Register</Link>
        </div>
      </h2>
      <form className={'mainContainer'}>
        <div className={'titleContainer'}>Register</div>
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
        <div className={'inputContainer'}>
          <input
           type='password'
            value={confirmPassword}
            placeholder="Enter your password again"
            onChange={(ev) => setConfirmPassword(ev.target.value)}
            className={'inputBoxc'}
          />
          <label className="errorLabel">{confirmPasswordError}</label>
        </div>
        <br />
        <div className={'inputContainer'}>
          <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Register'} />
        </div>
      </form>
    </>
  );
};

export default Register;