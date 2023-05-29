import { Fragment, useCallback, useEffect, useState } from 'react';
import pokemonService from '@/services/pokemonService';
import { Pokemon } from '../entity';
import { PokemonCard } from '../components';
import PokemonBanner from '../components/PokemonBanner';
import { DefaultLayout } from '@/layouts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  addFavoritePokemon,
  removeFavoritePokemon,
} from '@/redux/reducers/pokemonReducer';

type Pagination = {
  limit: number;
  offset: number;
};

function PokemonListPage() {
  const dispatch = useDispatch();
  const { favoritePokemons } = useSelector((state: RootState) => state.pokemon);

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [count, setCount] = useState<number>(0);
  const [params, setParams] = useState<Pagination>({
    limit: 20,
    offset: 0,
  });

  const fetchAllPokemons = useCallback(() => {
    return pokemonService.getAllPokemons(params).then((res) => {
      setPokemons(res.results);
      setCount(res.count);
    });
  }, [params]);

  const handleFavoriteClick = (data: Pokemon) => {
    if (favoritePokemons.includes(data)) {
      dispatch(removeFavoritePokemon(data));
      return;
    }

    dispatch(addFavoritePokemon(data));
  };

  useEffect(() => {
    fetchAllPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <DefaultLayout>
      <Fragment>
        <div className='p-4 mb-4'>
          <h2 className='text-xl mb-2'>Destaque</h2>
          <PokemonBanner
            pokemon={pokemons[0]}
            isDetail={true}
            onFavorite={() => handleFavoriteClick(pokemons[0])}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            isFavorite={favoritePokemons.find((poke) => {
              return poke.name === pokemons[0]?.name ? true : false;
            })}
            index={Number(pokemons[0]?.url.split('/')[6])}
          />
        </div>

        <div>
          <h2 className='text-xl px-4'>Pokemons</h2>
          <div className='flex flex-wrap px-2'>
            {pokemons &&
              pokemons.map((data, idx) => (
                <div key={idx} className='p-2 w-1/2'>
                  <PokemonCard
                    pokemon={data}
                    index={Number(data.url.split('/')[6])}
                    onFavorite={() => handleFavoriteClick(data)}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    isFavorite={favoritePokemons.find((data) => {
                      return data.name === pokemons[idx]?.name ? true : false;
                    })}
                  />
                </div>
              ))}
          </div>
          {params.limit < count && (
            <div
              className='text-center mb-24 mt-4'
              onClick={() =>
                setParams({
                  ...params,
                  limit: params.limit + 20,
                })
              }
            >
              <button className='bg-primary text-white px-6 py-2 rounded-full'>
                Load More
              </button>
            </div>
          )}
        </div>
      </Fragment>
    </DefaultLayout>
  );
}

export default PokemonListPage;
