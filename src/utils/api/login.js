import axios from 'axios';
import { API_HOST } from '../config';

const loginUser = async (cred) => {
  try {
    const res = await axios.post(`${API_HOST}/auth/local`, cred);

    if (res.data.user && res.data.jwt) {
      return res.data;
    }
  } catch (e) {
    console.log(e.message);
  }

  return null;
};

export default loginUser;
