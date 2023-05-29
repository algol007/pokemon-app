import Pokeball from '@/assets/pokeball.svg';
import sx from './FloatingTab.module.less';
import { useNavigate } from 'react-router-dom';

function FloatingTab() {
  const navigate = useNavigate();

  return (
    <div className={sx['max-w-600']}>
      <div className='w-3/5 bg-primary flex justify-around rounded shadow-lg p-1'>
        <div
          className='w-1/2 text-center cursor-pointer'
          onClick={() => navigate('/pokemons')}
        >
          <div className='w-8 h-8 mx-auto'>
            <img src={Pokeball} alt='pokeball' className='mx-auto' />
          </div>
          <div className='text-white text-sm'>Home</div>
        </div>
        <div
          className='w-1/2 text-center cursor-pointer'
          onClick={() => navigate('/pokemons/favorite')}
        >
          <span className='material-symbols-outlined mx-auto text-white w-8 h-8'>
            bookmark
          </span>
          <div className='text-white text-sm'>Favorites</div>
        </div>
      </div>
    </div>
  );
}

export default FloatingTab;
