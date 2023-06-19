import { Fragment, useCallback, useEffect, useState } from 'react';
import pokemonService from '@/services/pokemonService';
import { Pokemon } from '../entity';
import { PokemonCard } from '../components';
import { DefaultLayout } from '@/layouts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  addFavoritePokemon,
  removeFavoritePokemon,
} from '@/redux/reducers/pokemonReducer';
import InfiniteScroll from 'react-infinite-scroll-component';
import { toast } from 'react-toastify';
import { filterData } from '../constant';

type Pagination = {
  limit: number;
  offset: number;
};

function PokemonListPage() {
  const dispatch = useDispatch();
  const { favoritePokemons } = useSelector((state: RootState) => state.pokemon);

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filterBy, setFilterBy] = useState<string>('pokemon');
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');
  const [params, setParams] = useState<Pagination>({
    limit: 20,
    offset: 0,
  });

  const fetchAllPokemons = useCallback(() => {
    setIsLoading(true);
    return pokemonService
      .getAllPokemons(params)
      .then((res) => {
        setPokemons(res.results);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setPokemons([]);
        }
        toast.error(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [params]);

  const fetchAllPokemonsByFilter = useCallback(() => {
    return pokemonService
      .getPokemonFilter(filterBy, keyword)
      .then((res) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        setPokemons(res.pokemon);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setPokemons([]);
        }
        toast.error(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [filterBy, keyword]);

  const searchPokemon = useCallback(() => {
    return pokemonService
      .getPokemonById(keyword)
      .then((res) => {
        setPokemons([res]);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setPokemons([]);
        }
        toast.error(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [keyword]);

  const handleFavoriteClick = (data: Pokemon) => {
    if (favoritePokemons.includes(data)) {
      dispatch(removeFavoritePokemon(data));
      return;
    }

    dispatch(addFavoritePokemon(data));
  };

  useEffect(() => {
    if (keyword === '' && filterBy === 'pokemon') {
      fetchAllPokemons();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, keyword, filterBy]);

  useEffect(() => {
    const fetchPokemon = setTimeout(() => {
      if (keyword && filterBy === 'pokemon') {
        searchPokemon();
      }
      if (keyword && filterBy !== 'pokemon') {
        fetchAllPokemonsByFilter();
      }
    }, 2000);

    return () => {
      clearTimeout(fetchPokemon);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, filterBy]);

  return (
    <DefaultLayout>
      <Fragment>
        <div className='p-4 mb-4'>
          <div className='flex gap-2 w-full'>
            <div className='w-full'>
              <input
                type='text'
                placeholder='Search pokemon'
                className='border-2 border-primary rounded w-full py-2 px-4 h-10'
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <div className='flex items-center'>
              <button
                className='bg-primary w-10 h-10 flex justify-center items-center rounded'
                onClick={() => setIsFilter(!isFilter)}
              >
                <span className='material-symbols-outlined text-white'>
                  filter_list
                </span>
              </button>
            </div>
          </div>

          {isFilter && (
            <>
              <div className='mt-4 mb-2 text-center'>Filter By:</div>
              <div className='flex items-center gap-4 justify-center'>
                {filterData.map((data, idx) => (
                  <div key={idx}>
                    <input
                      onChange={(e) => setFilterBy(e.target.value)}
                      value={data.value}
                      id={data.value}
                      type='radio'
                      className='mr-2 accent-primary'
                      name='filterBy'
                      checked={filterBy === data.value}
                    />
                    <label htmlFor={data.value}>{data.name}</label>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div>
          <h1 className='text-xl px-4'>Pokemons</h1>
          {
            <InfiniteScroll
              dataLength={pokemons.length}
              next={() => {
                setParams({
                  ...params,
                  limit: params.limit + 20,
                });
              }}
              hasMore={true}
              loader={
                isLoading && (
                  <div className='text-center w-full text-sm mt-10 text-gray-400'>
                    Loading...
                  </div>
                )
              }
            >
              <div className='flex flex-wrap px-2'>
                {pokemons.length > 0 ? (
                  pokemons.map((data, idx) => (
                    <div key={idx} className='p-2 w-1/2'>
                      <PokemonCard
                        pokemon={data}
                        index={
                          data.id ||
                          Number(data?.url?.split('/')[6]) ||
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          //@ts-ignore
                          Number(data?.pokemon?.url?.split('/')[6])
                        }
                        onFavorite={() => handleFavoriteClick(data)}
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        isFavorite={favoritePokemons.find((data) => {
                          return data.name === pokemons[idx]?.name
                            ? true
                            : false;
                        })}
                      />
                    </div>
                  ))
                ) : (
                  <div className='text-center w-full text-sm mt-10 text-gray-400'>
                    No Pokemons Found.
                  </div>
                )}
              </div>
            </InfiniteScroll>
          }
        </div>
      </Fragment>
    </DefaultLayout>
  );
}

export default PokemonListPage;
