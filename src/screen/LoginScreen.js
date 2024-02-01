import React, { useState } from 'react';
import './LoginScreen.css';
import SignInScreen from './SignInScreen';
import SignupScreen from './SignupScreen';
function LoginScreen() {
  const [signIn, SetsignIn] = React.useState(false);
  const [signUp, SetsignUp] = useState(false);

  const handleImgClick = () => {
    SetsignIn(false);
    SetsignUp(false);
  };

  return (
    <div className="loginScreen">
      <div className='loginScreen__content'>
      <button onClick={handleImgClick} className="loginScreen__logoButton">
          <img
            src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
            alt=""
            className="loginScreen__logo"
          />
        </button>

        <button onClick={() => SetsignIn(true)} className="loginScreen__button">
          Sign In
        </button>

        <div className="loginScreen__gradient" />
      </div>

      <div className="loginScreen__body">
        {signIn ? (
          <SignInScreen />
        ) : signUp ? (
          <SignupScreen />
        ) : (
          <>
            <h1>Unlimited Films,TV Programmes And More. </h1>
            <h2>Watch Anywhere. Cancel at any time.</h2>
            <h3>
              Ready to watch? SignUp if you don't have an account. Hurry Up!!
            </h3>

            <div className="loginScreen__input">
              <button
                onClick={() => SetsignUp(true)}
                className="loginScreen__getStarted"
              >
                Sign Up
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginScreen;
