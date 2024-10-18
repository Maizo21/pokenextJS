import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from '../components/Loading/Loading';

test('renderiza bien el  Loading', () => {
    render(<Loading />);

    //Verificar que el texto que el texto existe
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    //Verificar que el texto es el correcto
    expect(screen.getByText('Loading...')).toHaveTextContent('Loading...');

    // Verificar que la imagen de la pokebola existe
    const image = screen.getByRole('img');

    // Verificar que la imagen tiene el src correcto
    expect(image).toHaveAttribute('src', '/images/loading-poke.gif');
});