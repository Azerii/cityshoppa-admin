import axios from 'axios';
import { API_HOST } from '../config';
// import getCollection from './getCollection';
import getToken from './getToken';

const deleteEntry = async (collectionType, id) => {
  const token = getToken();
  try {
    const res = await axios.delete(`${API_HOST}/${collectionType}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.data) {
      // await getCollection(collectionType);
      return res.data;
    }
  } catch (e) {
    console.log(e);
  }

  return null;
};

export default deleteEntry;
