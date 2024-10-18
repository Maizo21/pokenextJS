import React, { useEffect } from 'react'
import { useState } from 'react';

const Pagination = ({pokemonData, setPokemonFilter }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pokemonPerPage = 20;
    const [totalPages, setTotalPages] = useState(Math.ceil(pokemonData.length / pokemonPerPage));

    const nextPage = () => {
        if(currentPage < totalPages){
            setCurrentPage(currentPage + 1);
            window.scrollTo({top: 0, behavior: 'smooth'});
        }
    }

    const prevPage = () => {
        if(currentPage > 1 ){
            setCurrentPage(currentPage - 1);
            window.scrollTo({top: 0, behavior: 'smooth'});
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
        <button onClick={prevPage}>Prev</button>
        <p>{currentPage}</p>
        <button onClick={nextPage}>Next</button>
     </section>
    </>
  )
}

export default Pagination