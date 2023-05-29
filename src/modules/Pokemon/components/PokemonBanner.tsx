import { useNavigate } from 'react-router-dom';
import { Pokemon } from '../entity';

interface PokemonBannerProps {
  index: number;
  pokemon?: Pokemon;
  isDetail?: boolean;
  onFavorite: (data: any) => void;
  isFavorite?: boolean;
}

function PokemonBanner({
  index = 1,
  pokemon,
  onFavorite,
  isDetail = true,
  isFavorite = false,
}: PokemonBannerProps) {
  const navigate = useNavigate();

  return (
    <div className='bg-primary rounded-lg p-4 flex items-center'>
      <div className='flex justify-center w-1/3'>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`}
          alt={pokemon?.name}
          width={100}
        />
      </div>
      <div className='w-2/3 text-white border-l pl-4'>
        <div className='mb-2'>
          <div className='capitalize font-bold mb-2'>{pokemon?.name}</div>
          <p className='text-xs'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque,
            deleniti quas ratione nihil accusamus...
          </p>
        </div>
        <div className='flex justify-end gap-2 items-center'>
          <span
            className={`material-symbols-outlined cursor-pointer ${
              isFavorite && 'text-red-500'
            }`}
            onClick={onFavorite}
          >
            favorite
          </span>
          {isDetail && (
            <button
              className='text-xs bg-orange py-1 rounded-full px-2'
              onClick={() => navigate(`/pokemon/${pokemon?.name}`)}
            >
              See more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PokemonBanner;
