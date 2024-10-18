import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '../components/Navbar/Navbar';

test('render adecuado de los enlaces del Navbar', () => {
    render(<Navbar />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Game')).toBeInTheDocument();
    expect(screen.getByText('Favorites')).toBeInTheDocument();
});

test('renderiza el DarkMode bien', () => {
    render(<Navbar />);

    // Verificar que el checkbox exista
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    
    // Verificamos que el label tenga el emoji incial correcto
    expect(screen.getByText('🌚')).toBeInTheDocument();
});