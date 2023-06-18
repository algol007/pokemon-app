export type PokemonAbilities = {
  ability?: {
    name: string;
    url: string;
  }
  pokemon?: {
    name: string;
    url: string;
  }
  is_hidden: boolean;
  slot: number;
}

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
  pokemon?: PokemonAbilities[];
  abilities?: PokemonAbilities[];
  location_area_encounters?: string;
}