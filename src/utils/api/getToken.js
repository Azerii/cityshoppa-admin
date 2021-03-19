const { decrypt } = require('../crypto');

const getToken = () => {
  if (
    localStorage.getItem('admin:root')
    && localStorage.getItem('admin:root').length
  ) {
    const state = JSON.parse(localStorage.getItem('admin:root'));
    const tokenCipher = state.token;
    const token = decrypt(tokenCipher);

    return token;
  }
  return null;
};

export default getToken;
