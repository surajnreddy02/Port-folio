import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Contact from '../components/Contact';

describe('Contact Component', () => {
  it('renders contact form', () => {
  render(<Contact />);
  fireEvent.click(screen.getByRole('button', { name: /send message/i }));
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('shows error for empty submit', () => {
    render(<Contact />);
    // First button opens the modal, second is the submit button inside modal
    const sendButtons = screen.getAllByRole('button', { name: /send message/i });
    fireEvent.click(sendButtons[0]); // open modal
    fireEvent.click(sendButtons[1]); // submit form
    expect(screen.getByText(/username is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/message is required/i)).toBeInTheDocument();
  });

  // More integration tests can be added for successful submission with mock fetch
});
