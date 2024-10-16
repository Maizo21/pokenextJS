import React, { useEffect } from 'react'
import { useState } from 'react';

const Pagination = ({pokemonData, setPokemonFilter }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pokemonPerPage = 20;
    const [totalPages, setTotalPages] = useState(Math.ceil(pokemonData.length / pokemonPerPage));

    const nextPage = () => {
        if(currentPage < totalPages){
            setCurrentPage(currentPage + 1);
        }
    }

    const prevPage = () => {
        if(currentPage > 1 ){
            setCurrentPage(currentPage - 1);
        }
    } 
    

    useEffect(() => {
      const indexOfLastPokemon = currentPage * pokemonPerPage;
      const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
      const currentPokemons = pokemonData.slice(indexOfFirstPokemon, indexOfLastPokemon);
  
      setPokemonFilter(currentPokemons);
    }, [currentPage, pokemonData, setPokemonFilter]);
  

    useEffect(() => {
      setCurrentPage(1);
      setTotalPages(Math.ceil(pokemonData.length / pokemonPerPage));
    }, [pokemonData]);

    

  return (
    <>
     <section className='pagination'>
        <button onClick={prevPage}>Anterior</button>
        <p>{currentPage}</p>
        <button onClick={nextPage}>Siguiente</button>
     </section>
    </>
  )
}

export default Pagination