import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
// import { useHistory } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
 const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    usertype: 'User', // Default usertype set to 'User'
  });

//   const history = useHistory();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    // Implement login logic (send data to the backend)
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        console.log('Login successful');
        if(loginData.usertype=='User'){
            navigate('/user');
        }
        else if(loginData.usertype == 'coach'){
            navigate('/coach');
        }
        else{
            navigate('/admin');
        }
        // Redirect or handle success as needed
       // history.push('/dashboard'); // Redirect to the dashboard page after successful login
      } else {
        console.error('Login failed');
        // Handle error as needed
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      // Handle error as needed
    }
  };

  return (
    <Container maxWidth="xs">
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Login
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <InputLabel>User Type</InputLabel>
            <Select name="usertype" value={loginData.usertype} onChange={handleChange}>
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Coach">Coach</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            name="email"
            type="email"
            value={loginData.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            name="password"
            type="password"
            value={loginData.password}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
            Login
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
