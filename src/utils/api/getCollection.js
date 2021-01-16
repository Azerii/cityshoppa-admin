import axios from 'axios';
import { API_HOST } from '../config';
import getToken from './getToken';

const getCollection = async (collectionType) => {
  const token = getToken();
  try {
    const res = await axios.get(`${API_HOST}/${collectionType}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.data) {
      const count = res.data.length;
      const list = res.data;
      localStorage.setItem(collectionType, count.toString());
      localStorage.setItem(`${collectionType}List`, JSON.stringify(list));

      return res.data;
    }
  } catch (e) {
    console.log(e);
  }

  return null;
};

export default getCollection;
