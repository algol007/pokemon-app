import { useCallback, useEffect, useState } from 'react';
import PokemonBanner from '../components/PokemonBanner';
import pokemonService from '../../../services/pokemonService';
import { useNavigate } from 'react-router-dom';
import { Pokemon } from '../entity';

function PokemonDetailPage() {
  const navigate = useNavigate();
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
      <div
        className='flex gap-4 pb-1 border-b items-center mb-4'
        onClick={() => navigate('/pokemons')}
      >
        <span className='material-symbols-outlined'>arrow_back_ios_new</span>
        <h1 className='text-xl capitalize'>{pokemon?.name}</h1>
      </div>
      <div className='mb-4'>
        <PokemonBanner pokemon={pokemon} />
      </div>
      <div>
        <div className='pb-1 border-b mb-4'>
          <h1 className='text-xl'>Statistic</h1>
        </div>
        <ul>
          {pokemon &&
            pokemon.stats?.map((data, idx) => (
              <li className='flex items-center mb-2' key={idx}>
                <div className='w-1/2 capitalize text-sm'>
                  {data.stat.name}:
                </div>
                <div className='w-1/2'>
                  <div className='w-full bg-primary h-2.5 dark:bg-gray-700'>
                    <div
                      className='bg-orange h-2.5'
                      style={{ width: `${data.base_stat}%` }}
                    ></div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default PokemonDetailPage;
