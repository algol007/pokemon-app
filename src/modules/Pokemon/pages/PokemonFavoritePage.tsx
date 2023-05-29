import PokemonBanner from '../components/PokemonBanner';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { removeFavoritePokemon } from '@/redux/reducers/pokemonReducer';
import { DefaultLayout } from '@/layouts';
import { Pokemon } from '../entity';

function PokemonFavoritePage() {
  const dispatch = useDispatch();
  const { favoritePokemons } = useSelector((state: RootState) => state.pokemon);

  const handleFavoriteClick = (data: Pokemon) => {
    dispatch(removeFavoritePokemon(data));
    return;
  };

  return (
    <DefaultLayout>
      <div className='p-4'>
        <div className='pb-1 border-b mb-4'>
          <h1 className='text-xl capitalize'>Favorite</h1>
        </div>
        <div className='mb-4'>
          {favoritePokemons &&
            favoritePokemons.map((data, idx) => (
              <div key={idx} className='mb-2'>
                <PokemonBanner
                  pokemon={data}
                  onFavorite={() => handleFavoriteClick(data)}
                  isFavorite={true}
                  index={Number(data.url.split('/')[6])}
                />
              </div>
            ))}
        </div>
        <div className='text-center text-sm'>
          You have {favoritePokemons.length} favorite pokemons
        </div>
      </div>
    </DefaultLayout>
  );
}

export default PokemonFavoritePage;
