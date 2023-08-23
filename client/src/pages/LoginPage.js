import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../redux/authSlice';
import GoogleLogin from 'react-google-login';

function Login() {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading, error } = useSelector((state) => state.auth);

  const handleGoogleLoginSuccess = (response) => {
    // Handle successful Google login here (if needed)
    dispatch(fetchUser()); // Dispatch the fetchUser async thunk upon successful login
  };

  const handleGoogleLoginFailure = (error) => {
    console.error('Google login failed:', error);
    // Handle Google login failure here, if needed
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold mb-6">Login</h1>
      {isAuthenticated ? (
        <p className="text-center text-green-500">Welcome! You are already logged in.</p>
      ) : (
        <div>
          <GoogleLogin
            buttonText="Login with Google"
            onSuccess={handleGoogleLoginSuccess}
            onFailure={handleGoogleLoginFailure}
            disabled={isLoading}
            cookiePolicy={'single_host_origin'}
            className="w-full bg-blue-500 text-white font-semibold rounded-lg px-4 py-2 shadow-md hover:bg-blue-600"
          />
          {error && <p className="text-red-500">{error}</p>}
        </div>
      )}
    </div>
  );
}

export default Login;
