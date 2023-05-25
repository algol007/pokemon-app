import { httpClient } from "../libs/httpClient";
import { Pokemon, PokemonStats } from "../modules/Pokemon/entity";

type GeneralParams = {
  limit: number;
  offset: number
}

interface GetPokemonListResult {
  count: number;
  next?: string;
  previous?: string;
  results: Pokemon[]
}

interface GetPokemonDetailResult {
  name: string;
  url: string;
  stats: PokemonStats[]
}

const pokemonService = {
  getAllPokemons(params: GeneralParams): Promise<GetPokemonListResult> {
    return httpClient.get('/pokemon', { params });
  },
  getPokemonById(id: string | undefined): Promise<GetPokemonDetailResult> {
    return httpClient.get(`/pokemon/${id}`);
  },
}

export default pokemonService;