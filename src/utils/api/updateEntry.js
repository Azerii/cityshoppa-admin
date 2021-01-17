import axios from 'axios';
import { API_HOST } from '../config';
// import getCollection from './getCollection';
import getToken from './getToken';

const updateEntry = async (collectionType, data, id) => {
  const token = getToken();
  try {
    const res = await axios.put(`${API_HOST}/${collectionType}/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.data.id) {
      // await getCollection(collectionType);
      return res.data;
    }
  } catch (e) {
    console.log(e);
  }

  return null;
};

export default updateEntry;
