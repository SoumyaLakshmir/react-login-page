import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Container,Grid,Typography,TextField,Button,MenuItem,Select,InputLabel} from '@mui/material';

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
  const handleage = (event) => {
    setAge(event.target.value);
  };
  const handlegender = (event) => {
    setGender(event.target.value);
  };

  const validate = () => {
    let errors = {};

    if (!firstName) {
      errors.firstName = 'First name is required';
    }
    if (!lastName) {
      errors.lastName = 'Last name is required';
    }

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid email address';
    }

    if (!phoneNumber) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      errors.phoneNumber = 'Invalid phone number';
    }
    if (!age) {
      errors.age = 'Age is required';
    }
    
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      navigate("/setpassword")

      navigate.push('/login');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Registration
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="First name" value={firstName} onChange={handleFirstNameChange} 
            error={!!errors.firstName} helperText={errors.firstName}/>
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="Last name" value={lastName} onChange={handleLastNameChange}
              error={!!errors.lastName} helperText={errors.lastName} />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="Email" value={email} onChange={handleEmailChange}
              error={!!errors.email} helperText={errors.email} />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="Phone number" value={phoneNumber} onChange={handlePhoneNumberChange}
              error={!!errors.phoneNumber} helperText={errors.phoneNumber} />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="Age" value={age} type="number" onChange={handleage}
              error={!!errors.age} helperText={errors.age} />
          </Grid>

          <Grid item xs={12}>
          <InputLabel id="gender-label"  label="Gender" value={gender} onChange={handlegender} 
          error={!!errors.gender} helperText={errors.gender}>Gender</InputLabel>
          <Grid item xs={12}>
          <Select
            fullWidth labelId="gender-label"  value={gender} onChange={(event) => setGender(event.target.value)} label="Gender" >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
          </Grid>
 
          </Grid>

          <Grid item xs={12}>
            <Button fullWidth variant="contained" type="submit">
             Set Password
            
            </Button>
          </Grid>
        </Grid>
      </form>
      <Typography variant="body1" align="center">
        Already have an account? <Link to="/login">Login</Link>
      </Typography>
    </Container>
  );
};

export default CreateAccountPage;