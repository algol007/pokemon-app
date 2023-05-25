import { PokemonList } from '../entity';

interface PokemonCardProps {
  pokemon: PokemonList;
  index: number;
}

function PokemonCard({ pokemon, index }: PokemonCardProps) {
  return (
    <div className='bg-primary rounded-lg p-4'>
      <div className='flex justify-center'>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`}
          alt={pokemon.name}
          width={100}
        />
      </div>
      <div className='text-white text-center capitalize'>{pokemon.name}</div>
    </div>
  );
}

export default PokemonCard;
