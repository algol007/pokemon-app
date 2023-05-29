import { useEffect } from 'react';
import PokemonImage from '@/assets/pokemon.svg';
import { useNavigate } from 'react-router-dom';

function SplashScreenPage() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/pokemons');
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='bg-primary flex items-center justify-center min-h-screen'>
      <img src={PokemonImage} alt='pokemon' />
    </div>
  );
}

export default SplashScreenPage;
