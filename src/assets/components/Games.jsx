import React, { useState, useEffect } from 'react';
import { formatRelative, parse } from 'date-fns';

import DataTable from './DataTable';
import { list } from '../effects/index';

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
  useEffect(() => {
    (async () => {
      try {
        const data = await list('games');

        setRows(data);
      } catch (e) {
        onError(e.message);
      }
    })();
  }, []);

  const onCreate = () => console.log('Create');
  const onEdit = (row) => console.log('Edit', row);
  const onDelete = (selected) => console.log('Delete', selected);

  return (
    <DataTable
      title="Games"
      headRows={headRows}
      rows={rows}
      onCreate={onCreate}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
};

export default Games;
