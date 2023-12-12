// GoogleLoginComponent.js
import React from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

const GoogleLoginComponent = ({ setLogin, history }) => {
  const handleGoogleLoginSuccess = (response) => {
    console.log('Google login success:', response);

    axios.post('http://your-flask-server/google-login', {
      token: response.tokenId,
    })
    .then((serverResponse) => {
      const userData = serverResponse.data;
      setLogin(true);

      history.push('/Home');
    })
    .catch((error) => {
      console.error('Google login failed:', error);
    });
  };

  const handleGoogleLoginFailure = (error) => {
    console.error('Google login failed:', error);
  };

  return (
    <div>
      <h2>Google Login Page</h2>
      <GoogleLogin
        clientId="YOUR_GOOGLE_CLIENT_ID"
        buttonText="Continue with Google"
        onSuccess={handleGoogleLoginSuccess}
        onFailure={handleGoogleLoginFailure}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default GoogleLoginComponent;
