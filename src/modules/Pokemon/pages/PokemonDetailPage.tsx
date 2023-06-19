import { useCallback, useEffect, useState } from 'react';
import { PokemonBanner } from '../components';
import pokemonService from '@/services/pokemonService';
import { useNavigate, useParams } from 'react-router-dom';
import { Pokemon } from '../entity';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  addFavoritePokemon,
  removeFavoritePokemon,
} from '@/redux/reducers/pokemonReducer';
import { DefaultLayout } from '@/layouts';
import { toast } from 'react-toastify';

function PokemonDetailPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { favoritePokemons } = useSelector((state: RootState) => state.pokemon);

  const [pokemon, setPokemon] = useState<Pokemon>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchPokemonDetail = useCallback(() => {
    setIsLoading(true);
    return pokemonService
      .getPokemonById(id)
      .then((res) => setPokemon(res))
      .catch((err) => {
        if (err.response.status === 404) {
          setPokemon(undefined);
        }
        toast.error(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  const handleFavoriteClick = (data: Pokemon) => {
    if (favoritePokemons.includes(data)) {
      dispatch(
        removeFavoritePokemon({
          name: data.name,
          url: data.location_area_encounters,
        })
      );
      return;
    }

    dispatch(
      addFavoritePokemon({
        name: data.name,
        url: data.location_area_encounters,
      })
    );
  };

  useEffect(() => {
    fetchPokemonDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DefaultLayout>
      {isLoading ? (
        <div className='text-center mt-40'>Loading...</div>
      ) : (
        <div className='p-4'>
          <div
            className='flex gap-4 pb-1 border-b items-center mb-4 cursor-pointer'
            onClick={() => navigate('/pokemons')}
          >
            <span className='material-symbols-outlined'>
              arrow_back_ios_new
            </span>
            <h1 className='text-xl capitalize'>
              {pokemon?.name || 'Homepage'}
            </h1>
          </div>
          <div className='mb-4'>
            {pokemon ? (
              <>
                <PokemonBanner
                  pokemon={pokemon}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-ignore
                  onFavorite={() => handleFavoriteClick(pokemon)}
                  index={Number(pokemon?.id)}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-ignore
                  isFavorite={favoritePokemons.find((data) => {
                    return data.name === pokemon?.name ? true : false;
                  })}
                />
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
                          <div className='w-1/2 overflow-hidden'>
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
              </>
            ) : (
              <div className='text-center mt-40'>Data Not Found.</div>
            )}
          </div>
        </div>
      )}
    </DefaultLayout>
  );
}

export default PokemonDetailPage;
