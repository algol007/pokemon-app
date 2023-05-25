import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SplashScreenPage } from './modules/SplashScreen';
import { PokemonListPage } from './modules/Pokemon';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SplashScreenPage />} />
        <Route path='/pokemon-list' element={<PokemonListPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
