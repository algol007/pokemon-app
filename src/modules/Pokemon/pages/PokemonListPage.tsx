import { Fragment, useCallback, useEffect, useState } from 'react';
import pokemonService from '../../../services/pokemonService';
import { Pokemon } from '../entity';
import { PokemonCard } from '../components';
import PokemonBanner from '../components/PokemonBanner';
import { useNavigate } from 'react-router-dom';

function PokemonListPage() {
  const navigate = useNavigate();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const [params, setParams] = useState({
    limit: 20,
    offset: 0,
  });

  const fetchAllPokemons = useCallback(() => {
    return pokemonService.getAllPokemons(params).then((res) => {
      console.log(res);
      setPokemons(res.results);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchAllPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <div className='p-4 mb-4'>
        <h2 className='text-xl mb-2'>Destaque</h2>
        <PokemonBanner pokemon={pokemons[0]} isDetail={true} />
      </div>

      <div>
        <h2 className='text-xl px-4'>Pokemons</h2>
        <div className='flex flex-wrap px-2'>
          {pokemons &&
            pokemons.map((data, idx) => (
              <div key={idx} className='p-2 w-1/2'>
                <PokemonCard pokemon={data} index={params.offset + idx + 1} />
              </div>
            ))}
        </div>
      </div>
    </Fragment>
  );
}

export default PokemonListPage;
