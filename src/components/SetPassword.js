import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
} from '@mui/material';

const SetPassword = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordMatch(event.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setPasswordMatch(event.target.value === password);
  };

  const handleClick = () => {
    navigate("/login");
  };

  const validate = () => {
    let errors = {};

    if (!username) {
      errors.username = 'Username is required';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (
      !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)
    ) {
      errors.password =
        'Password must contain at least one number, one uppercase and lowercase letter, and at least 8 characters';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Confirm password is required';
    } else if (confirmPassword !== password) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (passwordMatch) {
      localStorage.setItem(username, password);
      console.log("Registration successful!");
      handleClick();
    } else {
      window.alert("Passwords do not match");
    }
    if (validate()) {
      navigate.push('/login');
    }
  };

  const isFormValid = !!username && !!password && !!confirmPassword;

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Set Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>

          <Grid item xs={12}>
            <TextField fullWidth label="Username" value={username} onChange={handleUsernameChange}
              error={!!errors.username} helperText={errors.username} />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="Password" type="password" value={password} onChange={handlePasswordChange}
              error={!!errors.password} helperText={errors.password} />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="Confirm password" type="password" value={confirmPassword} onChange={handleConfirmPasswordChange}
              error={!!errors.confirmPassword} helperText={errors.confirmPassword} />
          </Grid>

          <Grid item xs={12}>
            <Button fullWidth variant="contained" type="submit" disabled={!isFormValid}>
              Register
            </Button>
          </Grid>

        </Grid>
      </form>
    </Container>
  );
};

export default SetPassword;