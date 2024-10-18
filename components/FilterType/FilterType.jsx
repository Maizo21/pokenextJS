import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemonsTypes } from '../../app/data/store';

const FilterType = ({ setPokemonFilter }) => {

    const dispatch = useDispatch();
    const { pokemonTypes } = useSelector((state) => state.pokemon); 


    const filterByType = async (e) => {
        const type = e.target.getAttribute('datatype');
        const url = `https://pokeapi.co/api/v2/type/${type}`;  
        const response = await fetch(url);
        const data = await response.json();
        const filteredPokemon = data.pokemon.map(p => p.pokemon); 
        setPokemonFilter(filteredPokemon);  
    };

    useEffect(() => {
        dispatch(fetchPokemonsTypes());
    }, [dispatch]);

  return (
    <>
        <div className='buttons-container'>
            {pokemonTypes.map((type, index) => (
                <button key={index} datatype={index+1} className={`button-type button-${type.name}`} onClick={filterByType}>{type.name}</button>
            ))}

        </div>
    </>
  )
}

export default FilterType