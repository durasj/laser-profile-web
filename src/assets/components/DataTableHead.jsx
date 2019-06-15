import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Checkbox from '@material-ui/core/Checkbox';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const DataTableHead = ({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  headRows,
}) => (
  <TableHead>
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox
          indeterminate={numSelected > 0 && numSelected < rowCount}
          checked={numSelected === rowCount}
          onChange={onSelectAllClick}
          inputProps={{ 'aria-label': 'Select all' }}
        />
      </TableCell>

      {headRows.map(row => (
        <TableCell
          key={row.id}
          align={row.numeric ? 'right' : 'left'}
          padding={row.disablePadding ? 'none' : 'default'}
          sortDirection={orderBy === row.id ? order : false}
        >
          <TableSortLabel
            active={orderBy === row.id}
            direction={order}
            onClick={event => onRequestSort(event, row.id)}
          >
            {row.label}
          </TableSortLabel>
        </TableCell>
      ))}

      <TableCell padding="checkbox" />
    </TableRow>
  </TableHead>
);

export default DataTableHead;
