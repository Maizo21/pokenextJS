"use client"

import { useState, useEffect } from 'react';
import Loading from '../components/Loading/Loading';
import Link from 'next/link'
import FilterType from '../components/FilterType/FilterType';
import Pagination from '../components/Pagintation/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemonData } from './data/store';

export const Page = () => {

  const dispatch = useDispatch();
  const { pokemonData, loading } = useSelector((state) => state.pokemon); 

  const [pokemonFilter, setPokemonFilter] = useState([]);
  const [pokemonFound, setPokemonFound] = useState(true);
  const [paginationData, setPaginationData] = useState([]);

  const searchPokemon = (e) => {
    console.log(e.target.value);
    const searchValue = e.target.value;

    if(searchValue.trim() == '') {
      setPokemonFilter(pokemonData.slice(0, 20));
      setPaginationData(pokemonData);
      setPokemonFound(true);
      return;
    }else{
      const filteredPokemon = pokemonData.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(searchValue.toLowerCase());
      });
      setPokemonFilter(filteredPokemon);
      setPaginationData(filteredPokemon);

      if(filteredPokemon.length == 0){
        setPokemonFound(false);
        setPokemonFilter([]);
        setPaginationData([]);
      }
    }
  };

  useEffect(() => {
    setPokemonFilter(pokemonData.slice(0, 20));
    setPaginationData(pokemonData);
  }, [pokemonData]);

  useEffect(() => {
    dispatch(fetchPokemonData());
  }, [dispatch]);

  return (
    <>
        <h1>PokeNext</h1>
        <h2>Busca tu pokémon favorito</h2>
        <div className='input-container'>
          <input type="text" placeholder="Nombre" onChange={ (e)=>{searchPokemon(e)} } />
        </div>

        <div className='filter-container'>
          <FilterType pokemonData={paginationData} setPokemonFilter={setPokemonFilter} />
        </div>
        
        {loading && <Loading /> }

        <ul className='pokemons-container'>
            {Array.isArray(pokemonFilter) && pokemonFound && pokemonFilter.map((pokemon, index) => (
                <li key={index} className={`pokemon ${pokemon.url.split('pokemon/',-1)[1].replace('/','')}`}>
                  <Link href={`/pokemonDetail?id=${pokemon.url.split('pokemon/',-1)[1].replace('/','')}`}>
                    <p>{pokemon.name}</p>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('pokemon/',-1)[1].replace('/','')}.png`} alt={`${pokemon.name} picture`} />
                  </Link>
                </li>
            ))}
            {!pokemonFound && <p className='missingno-text'>Pokémon no encontrado... ¿o si? <Link href="/missingno">🚚</Link></p>}
        </ul>
        {!loading && pokemonFound && <Pagination pokemonData={paginationData} setPokemonFilter={setPokemonFilter} />}
    </>
  );
};

export default Page;
