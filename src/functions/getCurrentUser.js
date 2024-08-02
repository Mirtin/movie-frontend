import axios from "../axiosInstance"
import Cookies from "universal-cookie";

const getCurrentUser = () => {
  const cookies = new Cookies();
  const access = cookies.get("access");

  if (access) {
    return axios.get("http://127.0.0.1:8000/accounts/user/")
    .then(res => res.data)
    .catch(error => {
      console.error('Error fetching user data:', error);
      throw error;
    });
  } else {
    return Promise.resolve(0);
  }
};

export default getCurrentUser;
