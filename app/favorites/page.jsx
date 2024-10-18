"use client"

import Link from 'next/link';
import React from 'react'
import { useSelector } from 'react-redux';

const Favorites = () => {
    const { pokemonFavorites } = useSelector((state) => state.pokemon);

    console.log(pokemonFavorites);


  return (
    <>
        <div>
            <h1>Favoritos</h1>
            <p className='subtitle'>Aquí se mostrarán tus pokemones favoritos</p>

            <ul className='pokemons-container'>
                {pokemonFavorites.length > 0 ? (
                    pokemonFavorites.map((pokemon) => (
                        <li key={pokemon.id} className='pokemon-card'>
                            <Link href={`/pokemonDetail?id=${pokemon.id}`}>
                                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                                <p>{pokemon.name}</p>
                            </Link>
                        </li>
                    ))
                ) : (
                    <p className='no-favs'>No tienes pokemones favoritos por ahora</p>
                )}
            </ul>
            

        </div>
    </>
  )
}

export default Favorites