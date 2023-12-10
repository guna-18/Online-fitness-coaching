import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
    const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    address: '',
    height: 0,
    weight: 0,
    gender: 'Male',
    age: 0,
    usertype: 'User',
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    // Implement registration logic (send data to the backend)
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log('Registration successful');
        navigate('/login');
        // Redirect or handle success as needed
      } else {
        console.error('Registration failed');
        // Handle error as needed
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
      // Handle error as needed
    }
  };

  return (
    <Container maxWidth="sm">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            Registration Page
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField label="Name" fullWidth margin="normal" name="name" value={userData.name} onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Email" fullWidth margin="normal" name="email" value={userData.email} onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Phone Number"
            fullWidth
            margin="normal"
            name="phoneNumber"
            value={userData.phoneNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Address" fullWidth margin="normal" name="address" value={userData.address} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Height"
            fullWidth
            margin="normal"
            type="number"
            name="height"
            value={userData.height}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Weight"
            fullWidth
            margin="normal"
            type="number"
            name="weight"
            value={userData.weight}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Gender</InputLabel>
            <Select name="gender" value={userData.gender} onChange={handleChange}>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
        <FormControl fullWidth margin="normal">
          <InputLabel>User Type</InputLabel>
          <Select name="usertype" value={userData.usertype} onChange={handleChange}>
            <MenuItem value="User">User</MenuItem>
            <MenuItem value="Coach">Coach</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </Select>
        </FormControl>
      </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Age" fullWidth margin="normal" type="number" name="age" value={userData.age} onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
            Register
          </Button>
        </Grid>
      </Grid>

    </Container>
  );
};

export default RegistrationPage;
