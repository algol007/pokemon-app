import PokemonBanner from '../components/PokemonBanner';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  addFavoritePokemon,
  removeFavoritePokemon,
} from '@/redux/reducers/pokemonReducer';

function PokemonFavoritePage() {
  const dispatch = useDispatch();
  const favorite = useSelector((state: RootState) => state.pokemon);

  const handleFavoriteClick = (data: any) => {
    if (favorite.favoritePokemons.includes(data)) {
      dispatch(removeFavoritePokemon(data));
      return;
    }

    dispatch(addFavoritePokemon(data));
  };

  return (
    <div className='p-4'>
      <div className='pb-1 border-b mb-4'>
        <h1 className='text-xl capitalize'>Favorite</h1>
      </div>
      <div className='mb-4'>
        {favorite.favoritePokemons &&
          favorite.favoritePokemons.map((data, idx) => (
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
        You have {favorite.favoritePokemons.length} favorite pokemons
      </div>
    </div>
  );
}

export default PokemonFavoritePage;
