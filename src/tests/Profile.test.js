import React from 'react';
import { render, screen } from '@testing-library/react';
import Profile from '../components/Profile';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
  }));

describe('Profile', () => {
  it('renders the profile page', () => {
    render(<Profile />);

    
    expect(screen.getByText('Profile Page')).toBeInTheDocument();
  });
});
