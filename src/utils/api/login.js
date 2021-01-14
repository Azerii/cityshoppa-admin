import axios from 'axios';

const loginUser = async (cred) => {
  try {
    const res = await axios.post(
      `${process.env.API_HOST
        || 'https://cityshoppa.herokuapp.com'}/auth/local`,
      cred
    );

    if (res.data.user && res.data.jwt) {
      return res.data;
    }
  } catch (e) {
    console.log(e.message);
  }

  return null;
};

export default loginUser;
