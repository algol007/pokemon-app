import { useCallback, useEffect, useState } from 'react';
import pokemonService from '../../../services/pokemonService';
import { PokemonList } from '../entity';
import { PokemonCard } from '../components';

function PokemonListPage() {
  const [pokemons, setPokemons] = useState<PokemonList[]>([]);

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
    <div className=''>
      {pokemons &&
        pokemons.map((data, idx) => (
          <div key={idx} className='p-2'>
            <PokemonCard pokemon={data} index={params.offset + idx + 1} />
          </div>
        ))}
    </div>
  );
}

export default PokemonListPage;
