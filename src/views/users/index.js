import React, { useEffect, useState } from 'react';
import DataListView from 'src/views/DataListView';
import getUsers from 'src/utils/api/getUsers';

const UserListView = () => {
  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    const res = await getUsers();
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
