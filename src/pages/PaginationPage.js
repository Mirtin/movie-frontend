import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderComponent from '../components/HeaderComponent';

const PaginationPage = () => {
    const { page_number } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({ count: 0, next: null, previous: null, results: [] });

    const getMovieData = (page_number) => {
      axios.get(`http://127.0.0.1:8000/api/movie_list/?page=${page_number}&page_size=2`)
        .then(res => {
          const responseData = res.data;
          setData(responseData);
        })
        .catch(error => {
          console.error('Error fetching movie data:', error);
        });
    };

    useEffect(() => {
      if (!/^\d+$/.test(page_number)) {
        return navigate('/');
      }
      getMovieData(page_number);
    }, [navigate, page_number]);
  
    return (
        <>
            <HeaderComponent />
            {data.results.map(movie => (
                <div key={movie.id}>
                  <h1>{movie.id}</h1>
                  <h2>{movie.title}</h2>
                  <h3>{movie.description}</h3>
                  <img src={movie.image} alt={movie.title} />
                </div>
              ))}
            <h1>{data.count}</h1>
        </>
    );
};

export default PaginationPage;
