import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SplashScreenPage } from './modules/SplashScreen';
import {
  PokemonListPage,
  PokemonDetailPage,
  PokemonFavoritePage,
} from './modules/Pokemon';
import { NotFoundPage } from './modules/NotFound';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<NotFoundPage />} />
        <Route path='/' element={<SplashScreenPage />} />
        <Route path='/pokemons' element={<PokemonListPage />} />
        <Route path='/pokemons/favorite' element={<PokemonFavoritePage />} />
        <Route path='/pokemon/:id' element={<PokemonDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
