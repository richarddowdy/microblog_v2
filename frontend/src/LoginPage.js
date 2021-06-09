import React, { useState } from "react";
import LoginForm from "./LoginForm";
import "./LoginPage.css";

function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="login">
      <LoginForm signUp={isSignUp} />
      <div className="d-flex mt-5 text-center">
        {isSignUp ? (
          <div className="m-auto">
            <p className="px-3">Already have an account? Click here to sign in.</p>
            <button
              className="better-button btn btn-outline-primary mb-5"
              onClick={() => {
                setIsSignUp(false);
              }}
            >
              Login
            </button>
          </div>
        ) : (
          <div className="m-auto">
            <p className="px-3">Don't have an account with here yet? Click here to sign up!</p>
            <button
              className="better-button btn btn-outline-primary mb-5"
              onClick={() => {
                setIsSignUp(true);
              }}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
