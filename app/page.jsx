"use client"

import { useState, useEffect } from 'react';
import { getPokemonData } from './data/pokemon';
import Loading from '../components/Loading/Loading';
import Link from 'next/link'
import Pagination from '../components/Pagintation/Pagination';

export const Page = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [paginationData, setPaginationData] = useState([]);
  const [pokemonFilter, setPokemonFilter] = useState([]);
  const [pokemonFound, setPokemonFound] = useState(true);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPokemonData();
      setPokemonData(data);

      setPokemonFilter(pokemonData.slice(0, 20));
      setLoading(false);
      setPaginationData(data);
    };
    fetchData();
  }, []);   

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

  return (
    <>
        <h1>PokeNext</h1>
        <h2>Busca tu pokémon favorito</h2>
        <div className='input-container'>
          <input type="text" placeholder="Nombre" onChange={ (e)=>{searchPokemon(e)} } />
        </div>
        
        {loading && <Loading /> }

        <ul className='pokemons-container'>
            {pokemonFilter && pokemonFound && pokemonFilter.map((pokemon, index) => (
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
