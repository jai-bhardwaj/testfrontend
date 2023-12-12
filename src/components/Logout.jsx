import { GoogleLogout } from '@react-oauth/google';

const Logout = () => {
    const handleLogin = (res) => {
        console.log('Login success:', res);
    };

    const handleLogout = (res) => {
        console.log('Logout success', res);
    };

    return (
        <div>
            <GoogleLogin
                clientId="926125705288-ejpliuebndob4pct52hginrv3bhh6cr2.apps.googleusercontent.com"
                onSuccess={handleLogin}
                onFailure={handleLogout}
                buttonText='Login'
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    );
};

export default Logout;
