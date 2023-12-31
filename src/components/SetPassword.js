import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, TextField, Button } from '@mui/material';
import { ERROR_MESSAGES, VALIDATION_RULES } from './constants';

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
    navigate("/");
  };

  const validate = () => {
    let errors = {};

    if (!username) {
      errors.username = ERROR_MESSAGES.username;
    }

    if (!password) {
      errors.password = ERROR_MESSAGES.password;
    } else if (!VALIDATION_RULES.password.test(password)) {
      errors.password = ERROR_MESSAGES.invalidPassword;
    }

    if (!confirmPassword) {
      errors.confirmPassword = ERROR_MESSAGES.confirmPassword;
    } else if (confirmPassword !== password) {
      errors.confirmPassword = ERROR_MESSAGES.passwordMismatch;
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
      window.alert(ERROR_MESSAGES.passwordMismatch);
    }
    if (validate()) {
      navigate('/');
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
            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={handleUsernameChange}
              error={!!errors.username}
              helperText={errors.username}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              error={!!errors.password}
              helperText={errors.password}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Confirm password"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
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
