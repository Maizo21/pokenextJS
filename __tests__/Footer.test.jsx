import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer/Footer';

test('renderiza el Footer', () => {
    render(<Footer />);

    // Verificar que el texto exista
    expect(screen.getByText('made with ❤️ by')).toBeInTheDocument();

    // Verificar que mi usuario de GitHub esté bien escrito y dentro de un enlace
    expect(screen.getByRole('link')).toHaveTextContent('Maizo21');


    // Verificar que el enlace apunte a mi github: "https://github.com/Maizo21"
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://github.com/Maizo21');
});