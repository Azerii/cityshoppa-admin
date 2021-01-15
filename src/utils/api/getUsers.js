import axios from 'axios';
import { API_HOST } from '../config';
import getToken from './getToken';

const getUsers = async () => {
  const token = getToken();
  try {
    const res = await axios.get(`${API_HOST}/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.data) return res.data;
  } catch (e) {
    console.log(e);
  }

  return null;
};

export default getUsers;
