import React, { useState } from "react";
import LoginForm from "./LoginForm";
import "./LoginPage.css";

function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="login">
      <LoginForm signUp={isSignUp} />
      <div className="d-flex justify-content-center mt-5">
        {isSignUp ? (
          <>
            <span className="my-auto">Already have an account? Click here to sign in.</span>
            <button
              className="better-button btn btn-outline-primary m-3"
              onClick={() => {
                setIsSignUp(false);
              }}
            >
              Login
            </button>
          </>
        ) : (
          <>
            <span className="my-auto">Don't have an account with here yet? Click here to sign up!</span>
            <button
              className="better-button btn btn-outline-primary m-3"
              // style={{ fontSize: "1rem", text: "" }}
              onClick={() => {
                setIsSignUp(true);
              }}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
