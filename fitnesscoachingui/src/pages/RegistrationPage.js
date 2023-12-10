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
  Alert,
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

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    // Clear the error for the field when the user starts typing
    setErrors({ ...errors, [e.target.name]: null });
  };

  const handleRegister = async () => {
    // Validate form fields
    const newErrors = {};

    if (!userData.name) {
      newErrors.name = 'Name is required';
    }

    if (!userData.email) {
      newErrors.email = 'Email is required';
    } else {
      // Email pattern check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        newErrors.email = 'Invalid email address';
      }
    }

    if (!userData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else {
      // Phone number pattern check
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(userData.phoneNumber)) {
        newErrors.phoneNumber = 'Invalid phone number';
      }
    }

    if (!userData.password) {
      newErrors.password = 'Password is required';
    } else {
      // Password strength check (e.g., at least 8 characters, including uppercase, lowercase, and numbers)
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (!passwordRegex.test(userData.password)) {
        newErrors.password = 'Password is not strong enough(e.g., at least 8 characters, including uppercase, lowercase, and numbers)';
      }
    }

    // If there are errors, update the state and return
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

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
        setErrors({ general: 'User already exists' });
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
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            name="name"
            value={userData.name}
            onChange={handleChange}
            error={Boolean(errors.name)}
            helperText={errors.name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            name="email"
            value={userData.email}
            onChange={handleChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Phone Number"
            fullWidth
            margin="normal"
            name="phoneNumber"
            value={userData.phoneNumber}
            onChange={handleChange}
            error={Boolean(errors.phoneNumber)}
            helperText={errors.phoneNumber}
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
            error={Boolean(errors.password)}
            helperText={errors.password}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Address"
            fullWidth
            margin="normal"
            name="address"
            value={userData.address}
            onChange={handleChange}
          />
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
          <TextField
            label="Age"
            fullWidth
            margin="normal"
            type="number"
            name="age"
            value={userData.age}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
            Register
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Link to="/login">
            <Button variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          {errors.general && <Alert severity="error">{errors.general}</Alert>}
        </Grid>
      </Grid>
    </Container>
  );
};

export default RegistrationPage;
