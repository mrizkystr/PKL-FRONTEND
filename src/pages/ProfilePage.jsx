import React, { useEffect, useState } from 'react';
import { Button, Typography, Box, Alert } from '@mui/material';
import axios from '../api/axios';
import Cookies from 'js-cookie';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/profile');
        setProfile(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch profile');
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('/logout');
      Cookies.remove('token');
      alert('Logged out successfully');
      window.location.href = '/login'; // Redirect ke halaman login
    } catch (err) {
      alert('Logout failed');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', textAlign: 'center' }}>
      {error && <Alert severity="error">{error}</Alert>}
      {profile ? (
        <div>
          <Typography variant="h5">Welcome, {profile.username}!</Typography>
          <Button onClick={handleLogout} variant="contained" color="secondary" sx={{ mt: 2 }}>
            Logout
          </Button>
        </div>
      ) : (
        <Typography>Loading profile...</Typography>
      )}
    </Box>
  );
};

export default ProfilePage;
