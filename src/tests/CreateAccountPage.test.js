import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CreateAccountPage from '../components/CreateAccountPage';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('CreateAccountPage', () => {
  it('renders the registration form', () => {
    render(
      <BrowserRouter>
        <CreateAccountPage />
      </BrowserRouter>
    );
    expect(screen.getByLabelText('First name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone number')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText('Gender')).toBeInTheDocument();
    expect(screen.getByText('Set Password')).toBeInTheDocument();
    expect(screen.getByText('Already have an account?')).toBeInTheDocument();
  });

  it('submits the form with valid data', () => {
    render(
      <BrowserRouter>
        <CreateAccountPage />
      </BrowserRouter>
    );


    fireEvent.change(screen.getByLabelText('First name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText('Phone number'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText('Age'), { target: { value: '25' } });
    fireEvent.change(screen.getByLabelText('Gender'), { target: { value: 'male' } });

    fireEvent.click(screen.getByText('Set Password'));

  });

  it('disables the submit button when required fields are empty', () => {
    render(
      <BrowserRouter>
        <CreateAccountPage />
      </BrowserRouter>
    );

    expect(screen.getByText('Set Password')).toBeDisabled();


    fireEvent.change(screen.getByLabelText('First name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText('Phone number'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText('Age'), { target: { value: '25' } });
    fireEvent.change(screen.getByLabelText('Gender'), { target: { value: 'male' } });

    expect(screen.getByText('Set Password')).toBeEnabled();
  });
});
