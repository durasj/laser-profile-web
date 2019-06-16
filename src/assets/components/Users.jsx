import React, { useState, useEffect } from 'react';

import DataTable from './DataTable';
import { list, bulkDelete } from '../effects/index';
import ConfirmationDialog from './ConfirmationDialog';
import UsersDetailDialog from './UsersDetailDialog';

const headRows = [
  {
    id: 'nick',
    numeric: false,
    disablePadding: true,
    label: 'Nick',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
    align: 'left',
  },
  {
    id: 'role',
    numeric: false,
    disablePadding: false,
    label: 'Role',
    align: 'left',
  },
];

const Users = ({ onError }) => {
  const [rows, setRows] = useState([]);
  const [deleting, setDeleting] = useState();
  const [detailOpened, setDetailOpened] = useState(false);
  const [detailData, setDetailData] = useState();

  const loadUsers = async () => {
    try {
      const data = await list('users');

      setRows(data);
    } catch (e) {
      onError(e.message);
    }
  };
  useEffect(() => {
    loadUsers();
  }, []);

  const onCreate = () => {
    setDetailData(undefined);
    setDetailOpened(true);
  };
  const onEdit = row => {
    setDetailData(row);
    setDetailOpened(true);
  };
  const confirmDelete = async () => {
    await bulkDelete('users', deleting);
    loadUsers();
    setDeleting(undefined);
  };

  return (
    <>
      {deleting && (
        <ConfirmationDialog
          description={`Are you sure you want to delete these ${deleting.length} games?`}
          onCancel={() => setDeleting(undefined)}
          onConfirm={confirmDelete}
        />
      )}

      <UsersDetailDialog
        data={detailData}
        opened={detailOpened}
        onCancel={() => setDetailOpened(false)}
      />

      <DataTable
        title="Users"
        headRows={headRows}
        rows={rows}
        onCreate={onCreate}
        onEdit={onEdit}
        onDelete={setDeleting}
      />
    </>
  );
};

export default Users;
