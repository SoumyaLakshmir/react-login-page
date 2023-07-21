import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SetPassword from '../components/SetPassword';

describe('SetPassword', () => {
  it('renders the set password form', () => {
    render(<SetPassword />);

    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm password')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('submits the form with valid data and matches passwords', () => {
    render(<SetPassword />);

    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Password123' } });
    fireEvent.change(screen.getByLabelText('Confirm password'), { target: { value: 'Password123' } });

   
    fireEvent.click(screen.getByText('Register'));

    expect(localStorage.getItem('testuser')).toEqual('Password123');
  });

  it('shows an error message for mismatched passwords', () => {
    render(<SetPassword />);

 
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Password123' } });
    fireEvent.change(screen.getByLabelText('Confirm password'), { target: { value: 'Password456' } });

   
    fireEvent.click(screen.getByText('Register'));

   
    expect(window.alert).toHaveBeenCalledWith('Passwords do not match');
  });

  it('disables the submit button when required fields are empty', () => {
    render(<SetPassword />);

    
    expect(screen.getByText('Register')).toBeDisabled();

   
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Password123' } });
    fireEvent.change(screen.getByLabelText('Confirm password'), { target: { value: 'Password123' } });

   
    expect(screen.getByText('Register')).toBeEnabled();
  });
});
