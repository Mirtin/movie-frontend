import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PaginationPage from './pages/PaginationPage';
import MoviePage from './pages/MoviePage';
import BasePage from './pages/BasePage';

import LoginPage from './pages/accounts/LoginPage';
import RegistrationPage from './pages/accounts/RegistrationPage';
import ProfilePage from './pages/accounts/ProfilePage';

import './App.css'



const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<BasePage />}/>
          <Route path='movies/page/:page_number' element={<PaginationPage />} />
          <Route path='movie/:movie_title' element={<MoviePage />} />
          <Route path='accounts/registration' element={<RegistrationPage />} />
          <Route path='accounts/login' element={<LoginPage />} />
          <Route path='accounts/profile' element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;