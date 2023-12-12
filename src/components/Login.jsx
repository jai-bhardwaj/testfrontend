import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {

    const handleLogin = (user) => {
        console.log('Login successful:', user);
    };

    const handleLogout = (res) => {
        console.log('Logout successful', res);
    };

    return (
        <div>
            <h1>Login Page</h1>
            <GoogleLogin
                clientId="926125705288-liisv6532h6htmov9nfj0obo6flkqsul.apps.googleusercontent.com"
                onSuccess={handleLogin}
                onFailure={(error) => console.error('Login failed:', error)}
            />
        </div>
    );
};

export default Login;
