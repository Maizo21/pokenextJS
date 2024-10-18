
import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPokemonData, getPokemonsTypes } from './pokemon';

// Get data from pokemon.jsx

//All pokemons
export const fetchPokemonData = createAsyncThunk('pokemon/fetchPokemonData', async () => {
    const data = await getPokemonData();
    return data;
});


// All Pokemon types
export const fetchPokemonsTypes = createAsyncThunk('pokemon/fetchPokemonsTypes', async () => {
    const data = await getPokemonsTypes();
    return data;
});

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: {
        pokemonData: [],
        pokemonTypes: [],
        pokemonFavorites: [],
        loading: true,
    },
    reducers: {
        addFavorite: (state, action) => {
            const isFavorite = state.pokemonFavorites.find((pokemon) => pokemon.id === action.payload.id);
            if (!isFavorite) {
                state.pokemonFavorites.push(action.payload);
                alert('Pokemon añadido a favoritos');
            }else{
                alert('Este pokemon ya está en tus favoritos');
            }
        },
        removeFavorite: (state, action) => {
            state.pokemonFavorites = state.pokemonFavorites.filter((pokemon) => pokemon.id !== action.payload.id);
            alert('Pokemon eliminado de favoritos');
        }
    },
    extraReducers: (builder) => {
    builder
        .addCase(fetchPokemonData.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchPokemonData.fulfilled, (state, action) => {
            state.loading = false;
            state.pokemonData = action.payload;
        })
        .addCase(fetchPokemonData.rejected, (state) => {
            state.loading = false;
        })
        .addCase(fetchPokemonsTypes.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchPokemonsTypes.fulfilled, (state, action) => {
            state.pokemonTypes = action.payload;
        })
        .addCase(fetchPokemonsTypes.rejected, (state) => {
            state.loading = false;
        });
    },
});

export const { addFavorite, removeFavorite } = pokemonSlice.actions;

const store = configureStore({
    reducer: {
        pokemon: pokemonSlice.reducer,
    },
});



export default store;