import React, { useState } from 'react';
import LoginForm from './LoginForm';

function LoginPage() {

  const [isLogin, setIsLogin] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className=''>
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-success m-3 "
          onClick={() => {
            setIsLogin(true);
            setIsSignUp(false);
          }}
        >
          Login
        </button>
        <button
          className="btn btn-info m-3"
          onClick={() => {
            setIsSignUp(true);
            setIsLogin(false);
          }}
        >
          Signup
        </button>
      </div>
      <LoginForm login={isLogin} signUp={isSignUp}/>
    </div>
  )
}

export default LoginPage;