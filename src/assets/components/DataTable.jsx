import React from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

import theme from '../theme';
import DataTableHead from './DataTableHead';
import DataTableToolbar from './DataTableToolbar';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const StyledPaper = styled(Paper)`
  width: 100%;
  margin-bottom: ${theme.spacing(2)};
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const StyledTable = styled(Table)`
  min-width: 750px;
`;

const DataTable = ({ title, headRows, rows, onCreate, onEdit, onDelete }) => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }

  function handleClick(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  }

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleDelete = () => onDelete(selected) && setSelected([]);
  const handleEdit = (e, row) => {
    e.stopPropagation();
    onEdit(row);
  }

  return (
    <StyledPaper>
      <DataTableToolbar
        title={title}
        numSelected={selected.length}
        onCreate={onCreate}
        onDelete={handleDelete}
      />
      <TableWrapper>
        <StyledTable aria-labelledby="tableTitle">
          <DataTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            headRows={headRows}
          />
          <TableBody>
            {stableSort(rows, getSorting(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                const isItemSelected = selected.indexOf(row.id) !== -1;
                const labelId = `enhanced-table-checkbox-${row.id}`;

                return (
                  <TableRow
                    hover
                    onClick={event => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>

                    {headRows.map((column, index) =>
                      index === 0 ? (
                        <TableCell
                          key={column.id}
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {column.renderer
                            ? column.renderer(row[column.id])
                            : row[column.id]}
                        </TableCell>
                      ) : (
                        <TableCell
                          key={column.id}
                          align={column.align || 'right'}
                        >
                          {column.renderer
                            ? column.renderer(row[column.id])
                            : row[column.id]}
                        </TableCell>
                      ),
                    )}

                    <TableCell padding="checkbox">
                      <Tooltip title="Edit">
                        <IconButton onClick={(e) => handleEdit(e, row)} aria-label="Edit">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 49 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </StyledTable>
      </TableWrapper>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onChangePage={(event, newPage) => setPage(newPage)}
        onChangeRowsPerPage={event => setRowsPerPage(+event.target.value)}
      />
    </StyledPaper>
  );
};

export default DataTable;
