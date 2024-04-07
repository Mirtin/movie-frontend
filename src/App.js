import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PaginationPage from './pages/PaginationPage';
import MoviePage from './pages/MoviePage';
import BasePage from './pages/BasePage';
import './App.css'


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<BasePage />}/>
          <Route path='movies/page/:page_number' element={<PaginationPage />} />
          <Route path='movie/:movie_title' element={<MoviePage />} />

        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;