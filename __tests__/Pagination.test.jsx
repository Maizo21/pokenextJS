import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/Pagination/Pagination';

beforeAll(() => {
    window.scrollTo = jest.fn();  // Hay un scrollTo al hacer click en los botones
});

test('renderizar correctamente el componente de paginación', () => {
    const mockSetPokemonFilter = jest.fn();
    const pokemonData = Array.from({ length: 40 }, (_, i) => ({ name: `pokemon-${i + 1}` }));

    render(<Pagination pokemonData={pokemonData} setPokemonFilter={mockSetPokemonFilter} />);

    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Prev')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument(); 
});

test('cambiar la página al clickar en "Next"', () => {

    const mockSetPokemonFilter = jest.fn();
    const pokemonData = Array.from({ length: 40 }, (_, i) => ({ name: `pokemon-${i + 1}` }));
    
    render(<Pagination pokemonData={pokemonData} setPokemonFilter={mockSetPokemonFilter} />);
    
    // Verificar que al cargar se muestre "1"
    expect(screen.getByText('1')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Next'));
    
    // Verificar que al hacer click en "Next" se muestre "2"
    expect(screen.getByText('2')).toBeInTheDocument();
});

test('llama a setPokemonFilter al cambiar de página', () => {
    const mockSetPokemonFilter = jest.fn();
    const pokemonData = Array.from({ length: 40 }, (_, i) => ({ name: `pokemon-${i + 1}` }));
    
    render(<Pagination pokemonData={pokemonData} setPokemonFilter={mockSetPokemonFilter} />);
    
    // Verificar que "setPokemonFilter" se llame después del renderizado
    expect(mockSetPokemonFilter).toHaveBeenCalledTimes(1);
    
    fireEvent.click(screen.getByText('Next'));
    
    // Verificamos que setPokemonFilter se haya llamado de nuevo
    expect(mockSetPokemonFilter).toHaveBeenCalledTimes(2);
});