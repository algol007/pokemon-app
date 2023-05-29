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

function PokemonListPage() {
  const dispatch = useDispatch();
  const favorite = useSelector((state: RootState) => state.pokemon);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const [params, setParams] = useState({
    limit: 20,
    offset: 0,
  });

  const fetchAllPokemons = useCallback(() => {
    return pokemonService.getAllPokemons(params).then((res) => {
      setPokemons(res.results);
      console.log(res.results[0].url.split('/')[6]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFavoriteClick = (data: any) => {
    if (favorite.favoritePokemons.includes(data)) {
      dispatch(removeFavoritePokemon(data));
      return;
    }

    dispatch(addFavoritePokemon(data));
  };

  useEffect(() => {
    fetchAllPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            isFavorite={favorite.favoritePokemons.find((poke) => {
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
                    isFavorite={favorite.favoritePokemons.find((poke) => {
                      return poke.name === data.name ? true : false;
                    })}
                  />
                </div>
              ))}
          </div>
        </div>
      </Fragment>
    </DefaultLayout>
  );
}

export default PokemonListPage;
