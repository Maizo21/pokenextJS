import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DarkMode from '../components/DarkMode/DarkMode';

test('renderiza bien componente DarkMode', () => {
    render(<DarkMode />);

    // Verificar que el checkbox exista
    expect(screen.getByRole('checkbox')).toBeInTheDocument();

    // Verificar que el label tenga el emoji correcto al inicio
    expect(screen.getByLabelText('🌚')).toBeInTheDocument();
});

test('cambia el tema al hacer clic en el checkbox', () => {

    render(<DarkMode />);

    expect(screen.getByLabelText('🌚')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('checkbox'));

    // Verificar que el tema haya cambiado a "dark" con el emoji 🌞
    expect(screen.getByLabelText('🌞')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('checkbox'));

    // Verificar que el tema vuelva a "light" con el emoji 🌚
    expect(screen.getByLabelText('🌚')).toBeInTheDocument();
});
