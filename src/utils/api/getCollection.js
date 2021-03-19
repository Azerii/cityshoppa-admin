import axios from 'axios';
import { API_HOST } from '../config';
import getToken from './getToken';

const getCollection = async (collectionType, id) => {
  const token = getToken();
  let res;
  try {
    if (id) {
      res = await axios.get(`${API_HOST}/${collectionType}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } else {
      res = await axios.get(`${API_HOST}/${collectionType}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }

    if (res.data) {
      if (res.data.length) {
        const count = res.data.length;
        const list = res.data;
        localStorage.setItem(collectionType, count.toString());
        localStorage.setItem(`${collectionType}List`, JSON.stringify(list));
      }

      return res.data;
    }
  } catch (e) {
    console.log(e);
  }

  return null;
};

export default getCollection;
