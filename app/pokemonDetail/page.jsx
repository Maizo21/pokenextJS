"use client"

import React from 'react'
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'


const pokemonDetail = () => {

  const [pokemon, setPokemon] = useState('');

  const searchParams = useSearchParams()
  const pokemonID = searchParams.get('id');


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
      const data = await response.json();
      setPokemon(data);
      console.log(data);
    };
    fetchData();
  }
  , []);

  return (
    <>
      <h1>Pokemon Detail</h1>

      <main>

        <Suspense fallback={<div>Cargango...</div>}></Suspense>


        {pokemon && (
          <section className='pokemon-details' >
            <h2>Here is the detail of {pokemon.name}</h2>
            <p>ID: {pokemon.id}</p>
            <p>Altura: {pokemon.height}</p>
            <p>Peso: {pokemon.weight}</p>
            <p>Experiencia base: {pokemon.base_experience}</p>
            {pokemon.types && (
              <p>Tipo: {pokemon.types.map((type, index) => (
                <span key={index}>{type.type.name}, </span>
              ))}</p>
            )}

            {pokemon.stats && (
              <p>Estadisticas: {pokemon.stats.map((stat, index) => (
                <span key={index}>{stat.stat.name}: {stat.base_stat}, </span>
              ))}</p>
            )}
            <p>Picture:</p>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonID}.png`} alt={`Pokemon ${pokemonID} picture`} />
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png`} alt={`Pokemon ${pokemonID} picture`} />

            {pokemon.cries && (
              <>
                <p>Sonido:</p>
                <audio controls autoPlay>
                  <source src={pokemon.cries.latest != undefined ? pokemon.cries.latest : pokemon.cries.legacy  } type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </>
            )}

          </section>
        )}
      </main>

    </>

  )
}

export default pokemonDetail