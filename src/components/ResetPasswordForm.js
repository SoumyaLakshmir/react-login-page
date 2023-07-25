import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, TextField, Button } from '@mui/material';
import { ERROR_MESSAGES, VALIDATION_RULES } from './constants';

const ResetPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
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

    if (!email) {
      errors.email = ERROR_MESSAGES.email;
    } else if (!VALIDATION_RULES.email.test(email)) {
      errors.email = ERROR_MESSAGES.invalidEmail;
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
      localStorage.setItem(email, password);
      console.log("Registration successful!");
      handleClick();
    } else {
      window.alert(ERROR_MESSAGES.passwordMismatch);
    }
    if (validate()) {
      navigate('/');
    }
  };

  const isFormValid = !!email && !!password && !!confirmPassword;

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        ResetPassword
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email" value={email} onChange={handleEmailChange}
              error={!!errors.email} helperText={errors.email}  />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth label="Password" type="password" value={password}onChange={handlePasswordChange}
               error={!!errors.password} helperText={errors.password} />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth label="Confirm password" type="password" value={confirmPassword} onChange={handleConfirmPasswordChange}
              error={!!errors.confirmPassword} helperText={errors.confirmPassword}/>
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

export default ResetPasswordForm;
