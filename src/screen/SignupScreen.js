import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useRef } from 'react'
import { auth } from '../firebase';
import "./SignupScreen.css";

function SignupScreen() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

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
    <div className="signupScreen">
      <form>
        <h1>Sign Up</h1>
        <input ref={emailRef} placeholder="Email" type="email" />
        <input ref={passwordRef} type="password" placeholder="Password" />
        <button type="submit" onClick={register}>
          Sign Up
        </button>

      </form>
    </div>
  );
}

export default SignupScreen