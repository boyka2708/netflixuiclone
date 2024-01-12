import React, { useRef } from "react";
import "./SignInScreen.css";
import { auth, createUserWithEmailAndPassword } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
function SignInScreen() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const register = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className="signinScreen">
      <form>
        <h1>Sign In</h1>
        <input ref={emailRef} placeholder="Email" type="email" />
        <input ref={passwordRef} type="password" placeholder="Password" />
        <button type="submit" onClick={signIn}>
          Sign In
        </button>

        <h4>
          <span className="signinScreen__gray">New to Netflix?</span>{" "}
          <span className="signinScreen__link" onClick={register}>
            Sign Up Now.
          </span>
        </h4>
      </form>
    </div>
  );
}

export default SignInScreen;
