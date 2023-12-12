import React from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import { toast } from 'sonner';

const Login = ({ setLogin }) => {
    const responseGoogle = async (response) => {
        try {
            const { tokenId } = response;
            const serverResponse = await axios.post(
                'http://localhost:7777/auth',
                { tokenId },
                // You can add headers if needed
            );

            if (serverResponse.status === 200) {
                setLogin(true);
                toast.success('Login successful!', {
                    autoClose: 3000,
                    className: 'toast-success text-green-500',
                });
            } else {
                handleLoginFailure();
            }
        } catch (error) {
            console.error('Login error:', error);
            handleLoginFailure();
        }
    };

    const handleLoginFailure = () => {
        setLogin(false);
        toast.error('Login failed. Please try again.', {
            autoClose: 3000,
            className: 'toast-error text-red-500',
        });
    };

    return (
        <div className="login mt-20 h-screen items-center justify-center">
            <h1 className="text-[48px] text-center mb-10 logo">Login</h1>

            <GoogleLogin
                clientId="535125717426-n228ebh6bsljtpte4mntgo47ugo79pel.apps.googleusercontent.com"
                buttonText="Continue with Google"
                onSuccess={responseGoogle}
                onFailure={handleLoginFailure}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
};

export default Login;
