import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LoginForm from './components/LoginForm';
import SetPassword from './components/SetPassword';
import ForgotPassword from './components/ForgotPasswordPage';
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
            <Route exact path="/forgotpassword" element={<ForgotPassword/>} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
