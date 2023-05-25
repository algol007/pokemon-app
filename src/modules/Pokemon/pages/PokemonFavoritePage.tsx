import { useCallback, useEffect, useState } from 'react';
import PokemonBanner from '../components/PokemonBanner';
import { Pokemon } from '../entity';
import pokemonService from '../../../services/pokemonService';

function PokemonFavoritePage() {
  const [pokemon, setPokemon] = useState<Pokemon>();

  const fetchPokemonDetail = useCallback(() => {
    return pokemonService.getPokemonById('1').then((res) => {
      setPokemon(res);
    });
  }, []);

  useEffect(() => {
    fetchPokemonDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='p-4'>
      <div className='pb-1 border-b mb-4'>
        <h1 className='text-xl capitalize'>Favorite</h1>
      </div>
      <div className='mb-4'>
        <PokemonBanner pokemon={pokemon} />
      </div>
      <div className='text-center text-sm'>You have 1 favorite pokemons</div>
    </div>
  );
}

export default PokemonFavoritePage;
