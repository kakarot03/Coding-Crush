import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { register, login, googleRegister } from '../redux/apiCalls';
import validator from 'validator';
import jwt_decode from 'jwt-decode';
import './Login.css';

const Login = () => {
  const [className, setClassName] = useState('right-panel-deactive');
  const [loginDetails, setLoginDetails] = useState({
    loginEmail: '',
    loginPassword: '',
  });
  const [registerDetails, setRegisterDetails] = useState({
    username: '',
    registerEmail: '',
    registerPassword: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useDispatch();

  // to add and remove the classList on clicking signup/signin button
  const handleClick = (props) => {
    if (props === 'signup') {
      setClassName('right-panel-active');
    } else {
      setClassName('right-panel-deactive');
    }
  };

  const invalidInfo = () => {
    if (!validator.isEmail(registerDetails.registerEmail)) {
      setErrorMessage('Invalid Email!');
      return true;
    }
    if (registerDetails.registerPassword !== registerDetails.confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return true;
    }
    return false;
  };

  const RegisterHandleClick = (e) => {
    e.preventDefault();
    if (invalidInfo()) return;
    register(dispatch, registerDetails).then((data) => {
      if (data.payload) {
        // console.log(data.payload.username);
        setSuccessMessage('Registered Successfully, Signin Now!');
        document.getElementById('registerForm').reset();
        setClassName('right-panel-deactive');
        setErrorMessage('');
        setTimeout(() => {
          setSuccessMessage('');
        }, 4000);
      } else {
        if (data.hasOwnProperty('keyValue')) {
          setErrorMessage('Something went wrong!');
        } else {
          setErrorMessage(data);
        }
      }
    });
  };

  const LoginHandleClick = (e) => {
    e.preventDefault();
    if (!validator.isEmail(loginDetails.loginEmail)) {
      setErrorMessage('Invalid Email!');
      return;
    }
    login(dispatch, loginDetails).then((data) => {
      if (data.payload) {
        console.log(data.payload.username);
      } else {
        setErrorMessage(data);
      }
    });
  };

  const handleCallbackResponse = (response) => {
    const userObject = jwt_decode(response.credential);
    console.log(userObject);
    googleRegister(dispatch, userObject);
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        '1044214514310-mjbtjstk3ddn9674dkf5emfm82hggf77.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById('googleSignIn'), {
      theme: 'outline',
      size: 'medium',
    });
  }, []);

  return (
    <div className="Login">
      {errorMessage !== '' ? (
        <h4 className="error-message">{errorMessage}</h4>
      ) : (
        ''
      )}
      {successMessage && <h4 className="success-message">{successMessage}</h4>}
      <h2>Sign in/up Form</h2>
      <div className={className} id="container">
        <div className="form-container sign-up-container" id="form-container">
          <form action="#" id="registerForm">
            <h1 className="register-head">Create Account</h1>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) =>
                setRegisterDetails({
                  ...registerDetails,
                  username: e.target.value,
                })
              }
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) =>
                setRegisterDetails({
                  ...registerDetails,
                  registerEmail: e.target.value,
                })
              }
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setRegisterDetails({
                  ...registerDetails,
                  registerPassword: e.target.value,
                })
              }
            />
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) =>
                setRegisterDetails({
                  ...registerDetails,
                  confirmPassword: e.target.value,
                })
              }
            />
            <button onClick={RegisterHandleClick}>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container" id="form-container">
          <form action="#" id="loginForm">
            <h1
              style={{
                marginTop: '-2rem',
                marginBottom: '1.5rem',
              }}
            >
              Sign in
            </h1>
            <div id="googleSignIn" style={{ marginBottom: '1.5rem' }}></div>
            <span>or use your account</span>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) =>
                setLoginDetails({
                  ...loginDetails,
                  loginEmail: e.target.value,
                })
              }
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setLoginDetails({
                  ...loginDetails,
                  loginPassword: e.target.value,
                })
              }
            />
            {/* <a href="#">Forgot your password?</a> */}
            <button onClick={LoginHandleClick}>Sign In</button>
          </form>
        </div>
        <div className="overlay-container" id="overlay-container">
          <div className="overlay" id="overlay">
            <div
              className="overlay-panel overlay-left"
              id="overlay-panel overlay-left"
            >
              <h1>Welcome Back!</h1>
              <p>
                Register an Account with your Credentials and Begin your Game
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleClick('signin')}
              >
                Sign In
              </button>
            </div>
            <div
              className="overlay-panel overlay-right"
              id="overlay-panel overlay-right"
            >
              <h1>Hello, Friend!</h1>
              <p>
                SignIn to continue from where you've left, Let's beat the
                HighScore
              </p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => handleClick('signup')}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
