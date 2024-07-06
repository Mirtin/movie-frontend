import axios from "axios";
import Cookies from "universal-cookie";


const getCurrentUser = () => {
  const cookies = new Cookies();



  const access = cookies.get("access");
  if (access) {
    axios.get("http://127.0.0.1:8000/accounts/user/", {headers: {"Authorization": `Bearer ${access}`}})
      .then(res => {
        const responseData = res.data;
        cookies.set('username', responseData.username, { path: '/', expires: new Date(Date.now() + 3600000) });
        cookies.set('email', responseData.email, { path: '/', expires: new Date(Date.now() + 3600000) });
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }else{
    return (null);
  };  
};

export default getCurrentUser;