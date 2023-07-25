import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, TextField, Button, MenuItem, Select, InputLabel } from '@mui/material';
import { ERROR_MESSAGES, VALIDATION_RULES, ROUTES } from './constants';

const CreateAccountPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const validate = () => {
    let errors = {};

    if (!firstName) {
      errors.firstName = ERROR_MESSAGES.firstName;
    }

    if (!lastName) {
      errors.lastName = ERROR_MESSAGES.lastName;
    }

    if (!email) {
      errors.email = ERROR_MESSAGES.email;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = ERROR_MESSAGES.invalidEmail;
    }

    if (!phoneNumber) {
      errors.phoneNumber = ERROR_MESSAGES.phoneNumber;
    } else if (!VALIDATION_RULES.phoneNumber.test(phoneNumber)) {
      errors.phoneNumber = ERROR_MESSAGES.invalidPhoneNumber;
    }

    if (!age) {
      errors.age = ERROR_MESSAGES.age;
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      navigate(ROUTES.setpassword);
    }
  };

  const isDisabled = !firstName || !lastName || !email || !phoneNumber || !age || !gender;

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Registration
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="First name"
              value={firstName}
              onChange={handleFirstNameChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Last name"
              value={lastName}
              onChange={handleLastNameChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={handleEmailChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone number"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Age"
              value={age}
              type="number"
              onChange={handleAgeChange}
              error={!!errors.age}
              helperText={errors.age}
            />
          </Grid>

          <Grid item xs={12}>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              fullWidth
              labelId="gender-label"
              value={gender}
              onChange={handleGenderChange}
              label="Gender"
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12}>
            <Button fullWidth variant="contained" type="submit" disabled={isDisabled}>
              Set Password
            </Button>
          </Grid>
        </Grid>
      </form>
      <Typography variant="body1" align="center">
        Already have an account? <Link to={ROUTES.login}>Login</Link>
      </Typography>
    </Container>
  );
};

export default CreateAccountPage;
