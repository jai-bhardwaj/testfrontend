import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserComponent = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:7777/api/user');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h2>User Information</h2>
      {user && (
        <ul>
          <li>Email: {user.email}</li>
          <li>Name: {user.name}</li>
          {/* Add other user information as needed */}
        </ul>
      )}
    </div>
  );
};

export default UserComponent;
