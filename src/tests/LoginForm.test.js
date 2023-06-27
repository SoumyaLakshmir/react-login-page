import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  test('renders the login form', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    expect(screen.getByText('Forgot password?')).toBeInTheDocument();
  });

  test('displays required errors when form is submitted with empty fields', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const loginButton = screen.getByRole('button', { name: 'Login' });

    act(() => {
      fireEvent.click(loginButton);
    });

    expect(screen.getByText('Username is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

  test('displays password validation error when form is submitted with an invalid password', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    act(() => {
      fireEvent.change(usernameInput, { target: { value: 'testuser' } });
      fireEvent.change(passwordInput, { target: { value: 'pass' } });
      fireEvent.click(loginButton);
    });

    expect(
      screen.getByText(
        'Password must contain at least one number, one uppercase and lowercase letter, and at least 8 characters')).toBeInTheDocument();
  });

  test('navigates to dashboard on successful login', () => {

    const localStorageMock = {
      getItem: jest.fn((key) => {
        if (key === 'testuser') {
          return 'password123';
        }
        return null;
      }),
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    const history = createMemoryHistory();
    render(
      <Router history={history}>
      <LoginForm />
    </Router>
    );

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    act(() => {
      fireEvent.change(usernameInput, { target: { value: 'testuser' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(loginButton);
    });

    
  });

 
});
