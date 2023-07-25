import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('LoginForm', () => {
  it('renders the login form', () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    expect(screen.getByText('Forgot password?')).toBeInTheDocument();
  });

  it('submits the form with valid credentials', () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

   
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'john.doe' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });


    fireEvent.click(screen.getByText('Login'));

  });

  it('shows an error message for invalid credentials', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <LoginForm />
      </MemoryRouter>
    );
    expect(screen.getByText('Login')).toBeDisabled();

   
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'john.doe' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'invalidpassword' } });

    fireEvent.click(screen.getByText('Login'));

    expect(screen.getByText('Incorrect username or password')).toBeInTheDocument();
    //expect(window.alert).toHaveBeenCalledWith('Incorrect username or password');
    //console.log('Incorrect username or password');
  });

  it('disables the submit button when required fields are empty', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <LoginForm />
        </MemoryRouter>
    );


    expect(screen.getByText('Login')).toBeDisabled();

  
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'john.doe' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });

    expect(screen.getByText('Login')).toBeEnabled();
  });
});
