import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      localStorage.setItem('user', JSON.stringify(codeResponse));
      setUser(codeResponse);
    },
    onError: (error) => console.log('Login Failed:', error),
  });

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          setLoading(true);
          const response = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json',
            },
          });
          setProfile(response.data);
        } catch (error) {
          console.error('User info fetch error:', error);
          setError(error.message);
          if (error.response && error.response.status === 401) {
            console.log('Access token expired. Logging out.');
            googleLogout();
            setUser(null);
          }
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [user]);

  const logOut = () => {
    localStorage.removeItem('user');
    googleLogout();
    setUser(null);
    setProfile(null);
  };

  return (
    <div className="flex-col bg-black justify-center flex text-white h-screen items-center">
      <h2 className="text-center">React Google Login</h2>
      <br />
      <br />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {profile ? (
        <div className="flex flex-col items-center justify">
          <img src={profile.picture} alt="user data" className="rounded-full" />
          <h3 className="text-xl font-light">User Logged in</h3>
          <p className="text-lg font-bold">Name: {profile.name}</p>
          <p className="font-semibold text-sm">Email Address: {profile.email}</p>
          <br />
          <br />
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <button onClick={() => login()}>Sign in with Google 🚀</button>
      )}
    </div>
  );
}

export default App;
