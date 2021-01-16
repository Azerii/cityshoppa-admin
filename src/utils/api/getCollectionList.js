const getCollectionList = (collectionType) => {
  const storageName = `${collectionType}List`;
  const listStr = localStorage.getItem(storageName);

  return JSON.parse(listStr);
};

export default getCollectionList;
