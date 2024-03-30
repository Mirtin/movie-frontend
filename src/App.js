import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PaginationPage from './pages/PaginationPage';
import BasePage from './pages/BasePage';
import './App.css'


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<BasePage />}/>
          <Route path='movies/page/:page_number' element={<PaginationPage />} />

        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;