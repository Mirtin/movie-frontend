import { useParams, useNavigate  } from "react-router-dom";
import HeaderComponent from '../components/HeaderComponent';


const MoviePage = () => {

    const { movie_title } = useParams();

    return (
        <>
            <HeaderComponent />
            <h1> {movie_title}  </h1>
        </>
    );
};

export default MoviePage;