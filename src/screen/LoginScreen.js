import React from "react";
import "./LoginScreen.css";
import SignInScreen from "./SignInScreen";
function LoginScreen() {
  const [signIn, SetsignIn] = React.useState(false);
  return (
    <div className="loginScreen">
      <div className="loginScreen__background">
        <img
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt=""
          className="loginScreen__logo"
        />
        <button onClick={() => SetsignIn(true)} className="loginScreen__button">
          Sign In
        </button>

        <div className="loginScreen__gradient" />
      </div>

      <div className="loginScreen__body">
        {signIn ? (
          <SignInScreen />
        ) : (
          <>
            <h1>Unlimited Films,TV Programmes And More. </h1>
            <h2>Watch Anywhere. Cancel at any time.</h2>
            <h3>
              Ready to watch? Enter your Email to create or restart your
              membership
            </h3>

            <div className="loginScreen__input">
              <form>
                <input type="email" placeholder="Email Address" />
                <button
                  onClick={() => SetsignIn(true)}
                  className="loginScreen__getStarted"
                >
                  Get Started
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginScreen;
