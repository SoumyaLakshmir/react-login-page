
export const ERROR_MESSAGES = {
    username: 'Username is required',
    password: 'Password is required',
    
    passwordValidation:
      'Password must contain at least one number, one uppercase and lowercase letter, and at least 8 characters',
  };
  

  export const VALIDATION_RULES = {
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    email: /\S+@\S+\.\S+/,
    phoneNumber: /^\d{10}$/,
  };
  export const ROUTES = {
    login:'/',
    dashboard: '/dashboard',
    register: '/register',
    setpassword: '/setpassword',
    resetPassword: '/ResetPasswordForm',
    profile: '/profile'
  };
 
  