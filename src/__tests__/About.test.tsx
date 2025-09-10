import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('About Component', () => {
  it('renders About section with expected heading', () => {
    render(<About />);
    expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument();
  });

  it('renders bullet lists', () => {
    render(<About />);
    expect(screen.getAllByRole('list')).toHaveLength(2); // Adjust if more/less lists
  });
});
