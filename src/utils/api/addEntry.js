import axios from 'axios';
import { API_HOST } from '../config';
import getCollection from './getCollection';
import getToken from './getToken';

const addEntry = async (collectionType, data) => {
  const token = getToken();
  try {
    const res = await axios.post(`${API_HOST}/${collectionType}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.data.id) {
      await getCollection(collectionType);
      return res.data;
    }
  } catch (e) {
    console.log(e);
  }

  return null;
};

export default addEntry;
