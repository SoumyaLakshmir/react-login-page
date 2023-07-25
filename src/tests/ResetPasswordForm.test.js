import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ResetPasswordForm from '../components/ResetPasswordForm';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
  }));

describe('ResetPasswordForm', () => {
  it('renders the reset password form', () => {
    render(<ResetPasswordForm />);

    
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm password')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('submits the form with valid data and matches passwords', () => {
    render(<ResetPasswordForm />);

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Password123' } });
    fireEvent.change(screen.getByLabelText('Confirm password'), { target: { value: 'Password123' } });

   
    fireEvent.click(screen.getByText('Register'));

   
    expect(localStorage.getItem('test@example.com')).toEqual('Password123');
  });

  it('shows an error message for mismatched passwords', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<ResetPasswordForm />);


    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Password123' } });
    fireEvent.change(screen.getByLabelText('Confirm password'), { target: { value: 'Password456' } });

   
    fireEvent.click(screen.getByText('Register'));

   
    expect(alertMock).toHaveBeenCalledWith('Passwords do not match');
    alertMock.mockRestore();
  });

  it('disables the submit button when required fields are empty', () => {
    render(<ResetPasswordForm />);

   
    expect(screen.getByText('Register')).toBeDisabled();

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Password123' } });
    fireEvent.change(screen.getByLabelText('Confirm password'), { target: { value: 'Password123' } });

   
    expect(screen.getByText('Register')).toBeEnabled();
  });
});
