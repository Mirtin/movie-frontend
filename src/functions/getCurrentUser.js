import axios from "axios";


const getCurrentUser = () => {
    const access_token = localStorage.getItem("access_token");
    axios.get("http://127.0.0.1:8000/accounts/user/", {headers: {"Authorization": `Bearer ${access_token}`}})
      .then(res => {
        const responseData = res.data;
        localStorage.setItem('access_token', responseData.access);
        localStorage.setItem('refresh_token', responseData.refresh);
        console.log(responseData)
      })
      .catch(error => {
        console.error('Error fetching movie data:', error);
      });
};

export default getCurrentUser