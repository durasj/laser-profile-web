import React, { useState, useEffect } from 'react';
import { formatRelative, parse } from 'date-fns';

import DataTable from './DataTable';
import { list, bulkDelete } from '../effects/index';
import ConfirmationDialog from './ConfirmationDialog';

const headRows = [
  {
    id: 'mode',
    numeric: false,
    disablePadding: true,
    label: 'Mode',
  },
  { id: 'players', numeric: true, disablePadding: false, label: 'Players' },
  { id: 'teams', numeric: true, disablePadding: false, label: 'Teams' },
  {
    id: 'played',
    numeric: false,
    disablePadding: false,
    label: 'Date',
    align: 'left',
    renderer: played =>
      formatRelative(
        parse(played, 'yyyy-MM-dd HH:mm:ss', new Date()),
        new Date(),
      ),
  },
];

const Games = ({ onError }) => {
  const [rows, setRows] = useState([]);
  const [deleting, setDeleting] = useState();
  const loadGames = async () => {
    try {
      const data = await list('games');

      setRows(data);
    } catch (e) {
      onError(e.message);
    }
  };
  useEffect(() => {
    loadGames();
  }, []);

  const onCreate = () => console.log('Create');
  const onEdit = (row) => console.log('Edit', row);
  const confirmDelete = async () => {
    await bulkDelete('games', deleting);
    loadGames();
    setDeleting(undefined);
  };

  return (
    <>
      {deleting && <ConfirmationDialog
        description={`Are you sure you want to delete these ${deleting.length} games?`}
        onCancel={() => setDeleting(undefined)}
        onConfirm={confirmDelete}
      />}
      <DataTable
        title="Games"
        headRows={headRows}
        rows={rows}
        onCreate={onCreate}
        onEdit={onEdit}
        onDelete={setDeleting}
      />
    </>
  );
};

export default Games;
