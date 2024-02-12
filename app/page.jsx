"use client"

import { useState, useEffect } from 'react';
import { getPokemonData } from './data/pokemon';
import Link from 'next/link'

export const Page = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [search, setSearch] = useState('');

  const [pokemonFilter, setPokemonFilter] = useState([]);
  const [pokemonFound, setPokemonFound] = useState(true);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPokemonData();
      setPokemonData(data);
      setPokemonFilter(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const searchPokemon = (e) => {
    setSearch(e.target.value);
    console.log(search);

    if(search.trim() == '' || e.target.value == '' || search == '') {
      setPokemonFilter(pokemonData);
      setPokemonFound(true);
      return;
    }else{
      const filteredPokemon = pokemonData.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(search.toLowerCase());
      });
      setPokemonFilter(filteredPokemon);
      console.log(filteredPokemon);

      if(filteredPokemon.length == 0){
        setPokemonFound(false);
        setPokemonFilter([]);
      }
    }
  };

  return (
    <>
        <h1>PokeNext</h1>
        <h2>Busca tu pokémon favorito</h2>
        <div className='input-container'>
          <input type="text" placeholder="Nombre" onKeyUpCapture={ (e)=>{searchPokemon(e)} } />
        </div>
        
        {loading && <p className='loading'>Cargando... <span><img src="/images/loading-poke.gif" alt="loading pokeball gif" /></span></p> }

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
    </>
  );
};

export default Page;
