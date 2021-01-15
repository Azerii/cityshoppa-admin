const { decrypt } = require('../crypto');

const getToken = () => {
  const state = JSON.parse(localStorage.getItem('admin:root'));
  const tokenCipher = state.token;
  const token = decrypt(tokenCipher);

  return token;
};

export default getToken;
