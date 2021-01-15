import React, { useEffect, useState } from 'react';
import DataListView from 'src/views/DataListView';
import getCollection from 'src/utils/api/getCollection';

const UserListView = () => {
  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    const res = await getCollection('users');
    // console.log(res);
    if (res) setUsers(res);
  }

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  return <DataListView data={users} contentType="user" />;
};

export default UserListView;
