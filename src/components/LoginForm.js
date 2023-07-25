import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, TextField, Button } from '@mui/material';
import { ERROR_MESSAGES, VALIDATION_RULES, ROUTES } from './constants';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const validate = () => {
    let errors = {};

    if (!username) {
      errors.username = ERROR_MESSAGES.username;
    }

    if (!password) {
      errors.password = ERROR_MESSAGES.password;
    } else if (!VALIDATION_RULES.password.test(password)) {
      errors.password = ERROR_MESSAGES.passwordValidation;
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const storedPassword = localStorage.getItem(username);

    if (storedPassword === password) {
      console.log('Login successful!');
      navigate(ROUTES.dashboard);
    } else {
      window.alert('Incorrect username or password');
      console.log('Incorrect username or password');
    }

    if (validate()) {
      navigate(ROUTES.profile);
    }
  };

  const isDisabled = !username || !password;

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Login
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
            <Button fullWidth variant="contained" type="submit" disabled={isDisabled}>
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
      <Typography variant="body1" align="center">
        Don't have an account? <Link to={ROUTES.register}>Create account</Link>
      </Typography>
      <Typography align="center">
        <Link to={ROUTES.resetPassword} color="primary">
          Forgot password?
        </Link>
      </Typography>
    </Container>
  );
};

export default LoginForm;
