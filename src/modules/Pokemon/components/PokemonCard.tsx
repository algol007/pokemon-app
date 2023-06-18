import { useNavigate } from 'react-router-dom';
import { Pokemon } from '../entity';

interface PokemonCardProps {
  pokemon: Pokemon;
  index: number;
  onFavorite: (data: any) => void;
  isFavorite?: boolean;
}

function PokemonCard({
  pokemon,
  index,
  onFavorite,
  isFavorite = false,
}: PokemonCardProps) {
  const navigate = useNavigate();

  return (
    <div className='bg-primary rounded-lg p-4'>
      <div className='flex justify-center'>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`}
          alt={pokemon.name}
          width={100}
        />
      </div>
      <div className='text-white text-center capitalize font-bold mb-2 h-6 overflow-hidden'>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        {pokemon.name || pokemon.pokemon?.name}
      </div>
      <div className='flex justify-center'>
        <div className='flex px-4 py-1 rounded-full gap-6 bg-secondary'>
          <span
            className={`material-symbols-outlined cursor-pointer ${
              isFavorite ? 'text-red-500' : 'text-white'
            }`}
            onClick={onFavorite}
          >
            favorite
          </span>
          <span
            className='material-symbols-outlined text-white cursor-pointer'
            onClick={() =>
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              navigate(`/pokemon/${pokemon.name || pokemon.pokemon?.name}`)
            }
          >
            info
          </span>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
