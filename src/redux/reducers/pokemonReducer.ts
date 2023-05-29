import { Pokemon } from '@/modules/Pokemon/entity'
import { createSlice } from '@reduxjs/toolkit'

interface PokemonType {
  favoritePokemons: Pokemon[]
}

const initialState: PokemonType = {
  favoritePokemons: [],
}

export const pokemon = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    addFavoritePokemon: (state, action) => {
      state.favoritePokemons = [...state.favoritePokemons, action.payload]
    },
    removeFavoritePokemon: (state, action) => {
      const newState = state.favoritePokemons.filter((data: Pokemon) => data.name !== action.payload.name)
      state.favoritePokemons = newState
    },
  },
})

export const { addFavoritePokemon, removeFavoritePokemon } = pokemon.actions

export default pokemon.reducer