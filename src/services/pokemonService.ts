import { httpClient } from "../libs/httpClient";
import { PokemonList } from "../modules/Pokemon/entity";

type GeneralParams = {
  limit: number;
  offset: number
}

interface GetPokemonListResult {
  count: number;
  next?: string;
  previous?: string;
  results: PokemonList[]
}

const pokemonService = {
  getAllPokemons(params: GeneralParams): Promise<GetPokemonListResult> {
    return httpClient.get('/pokemon', { params });
  },
}

export default pokemonService;