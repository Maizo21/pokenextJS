"use client"

import React from 'react'
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Loading from '../../components/Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../data/store';


const pokemonDetail = () => {

  const favorites = useSelector((state) => state.pokemon.pokemonFavorites);
  const dispatch = useDispatch();
  const [pokemon, setPokemon] = useState('');
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState('');

  const searchParams = useSearchParams()
  let pokemonID = searchParams.get('id');

  const saveFavorite = () => {
    dispatch(addFavorite(pokemon));
    setIsFavorite('active');
  }

  const deleteFavorite = () => {
    dispatch(removeFavorite(pokemon));
    setIsFavorite('');
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
      const data = await response.json();
      setTimeout(() => {
      setPokemon(data);
      setLoading(false);
      }, 500);
      console.log(data);
    };
    fetchData();

    setIsFavorite(favorites.find((favorite) => favorite.id === parseInt(pokemonID)) ? 'active' : '');

  }
  , []);


  return (
    <>
      <h1>Pokemon Detail</h1>

      <main>
        <Suspense fallback={<Loading />}>
          {loading && <Loading />}

          {pokemon && (
            <section className='pokemon-details' >
              <div className={`fav-icon ${isFavorite}`} onClick={isFavorite ? deleteFavorite : saveFavorite}>
              <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M22 8.86222C22 10.4087 21.4062 11.8941 20.3458 12.9929C17.9049 15.523 15.5374 18.1613 13.0053 20.5997C12.4249 21.1505 11.5042 21.1304 10.9488 20.5547L3.65376 12.9929C1.44875 10.7072 1.44875 7.01723 3.65376 4.73157C5.88044 2.42345 9.50794 2.42345 11.7346 4.73157L11.9998 5.00642L12.2648 4.73173C13.3324 3.6245 14.7864 3 16.3053 3C17.8242 3 19.2781 3.62444 20.3458 4.73157C21.4063 5.83045 22 7.31577 22 8.86222Z" stroke="#000000" strokeWidth="1.5" strokeLinejoin="round"></path></svg>
              </div>
              <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonID}.png`} alt={`Pokemon ${pokemonID} picture`} className='main-image' />
              <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png`} alt={`Pokemon ${pokemonID} picture`} className='in-game' />
              <article>
                <h2>{pokemon.name}</h2>
                <p>ID: {pokemon.id}</p>
                <p>Height: {pokemon.height / 10} m.</p>
                <p>Weight: {pokemon.weight / 10} kg.</p>
                {pokemon.types && (
                  <p>Type: {pokemon.types.map((type, index) => (
                    <span key={index}>{type.type.name}, </span>
                  ))}</p>
                )}

                {pokemon.stats && (
                  <p>Stats: {pokemon.stats.map((stat, index) => (
                    <span key={index}>{stat.stat.name}: {stat.base_stat}, </span>
                  ))}</p>
                )}
              </article>


              {pokemon.cries && (
                <>
                  <p>Sound:</p>
                  <audio controls autoPlay>
                    <source src={pokemon.cries.latest != undefined ? pokemon.cries.latest : pokemon.cries.legacy  } type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </>
              )}

            </section>
          )}
          
        </Suspense>
      </main>

    </>

  )
}

export default pokemonDetail