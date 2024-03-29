import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = ({ changeUserId, changeUserType }) => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    usertype: "User", // Default usertype set to 'User'
  });

  const [errors, setErrors] = useState({});
  const [membershipData, setMembershipData] = useState(null);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    // Clear the error for the field when the user starts typing
    setErrors({ ...errors, [e.target.name]: null });
  };

  const fetchMembershipData = async (userId, usertype) => {
    try {
      const response = await fetch(
        `http://localhost:3001/membership/${userId}`
      );

      if (response.ok) {
        const membershipData = await response.json();
        console.log("first", membershipData.type);
        setMembershipData(membershipData.type);
        changeUserId(userId);

        console.log("second", membershipData.type);
        if (usertype === "User") {
          changeUserType("User");
          if (membershipData && membershipData.type === "elite") {
            navigate(`/home/eliteUser/${userId}`);
          } else {
            // Assuming non-elite users are basic users
            navigate(`/home/basicUser/${userId}`);
          }
        } else if (usertype === "Coach") {
          changeUserType("Coach");
          navigate("/coachHomepage");
        } else {
          changeUserType("Admin");
          navigate("/Admin");
        }
      } else {
        console.error(
          `Failed to fetch membership data. Status: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error fetching membership data:", error.message);
    }
  };
  const handleLogin = async () => {
    // Validate form fields
    const newErrors = {};

    if (!loginData.email) {
      newErrors.email = "Email is required";
    } else {
      // Email pattern check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(loginData.email)) {
        newErrors.email = "Invalid email address";
      }
    }

    if (!loginData.password) {
      newErrors.password = "Password is required";
    }

    // If there are errors, update the state and return
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const responseData = await response.json();
        const { userId, usertype } = responseData;
        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("usertype", usertype);
        changeUserId(userId);
        if (usertype === "Coach") {
          changeUserType("Coach");
          navigate("/coachHomepage");
        } else if (usertype === "Admin") {
          changeUserType("Admin");
          navigate("/Admin");
        } else {
          await fetchMembershipData(userId, usertype);
        }
      } else {
        setErrors({ general: "Login failed" });
      }
    } catch (error) {
      setErrors({ general: `Error during login: ${error.message}` });
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
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Login
          </Typography>
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
            error={Boolean(errors.email)}
            helperText={errors.email}
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
            error={Boolean(errors.password)}
            helperText={errors.password}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
          >
            Login
          </Button>
        </Grid>
        <Grid item xs={12}>
          {errors.general && <Alert severity="error">{errors.general}</Alert>}
        </Grid>
        <Grid item xs={12}>
          <Link to="/register">
            <Button variant="contained" color="primary" fullWidth>
              Register
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
