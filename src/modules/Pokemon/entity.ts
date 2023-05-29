export type PokemonStats = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    ur: string;
  };
}

export interface Pokemon {
  id?: number;
  name: string;
  url: string;
  stats?: PokemonStats[];
}