import { useParams, useNavigate  } from "react-router-dom";
import { useEffect } from 'react';

import HeaderComponent from '../components/HeaderComponent';


const PaginationPage = () => {

    const { page_number } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        if (!/^\d+$/.test(page_number)) {
            console.log(0);
            return navigate('/');
          }
      }, [navigate, page_number]);
    

    return (
        <>
            <HeaderComponent />
            <h1> {page_number} </h1>
        </>
    );
};

export default PaginationPage;