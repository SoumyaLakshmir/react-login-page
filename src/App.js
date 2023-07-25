import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LoginForm from './components/LoginForm';
import SetPassword from './components/SetPassword';
import Profile from './components/Profile';
import ResetPasswordForm from './components/ResetPasswordForm';
import CreateAccountPage from './components/CreateAccountPage';
import './App.css';

const theme = createTheme();

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/register" element={<CreateAccountPage />} />
            <Route exact path="/setpassword" element={<SetPassword/>} />
            <Route exact path="/ResetPasswordForm" element={<ResetPasswordForm/>} />
            <Route exact path="/profile" element={<Profile/>} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
