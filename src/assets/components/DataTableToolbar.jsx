import React from 'react';
import styled from 'styled-components';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import theme from '../theme';

const StyledToolbar = styled(({ hasSelection, ...rest }) => (
  <Toolbar {...rest} />
))`
  padding-left: ${theme.spacing(2)};
  padding-right: ${theme.spacing(1)};

  border-top-left-radius: ${theme.shape.borderRadius}px;
  border-top-right-radius: ${theme.shape.borderRadius}px;

  background-color: ${p =>
    p.hasSelection
      ? theme.palette.secondary.dark
      : theme.palette.background.paper};
`;

const StyledTitle = styled.div`
  flex: 0 0 auto;
`;

const StyledSpacer = styled.div`
  flex: 1 1 100%;
`;

const StyledActions = styled.div`
  color: ${theme.palette.text.secondary};
`;

const DataTableToolbar = ({ title, numSelected, onCreate, onDelete }) => (
  <StyledToolbar hasSelection={numSelected > 0}>
    <StyledTitle>
      {numSelected > 0 ? (
        <Typography color="inherit" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography variant="h6" id="tableTitle">
          {title}
        </Typography>
      )}
    </StyledTitle>
    <StyledSpacer />
    <StyledActions>
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={onDelete} aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Button color="inherit" onClick={onCreate}>
          Create
        </Button>
      )}
    </StyledActions>
  </StyledToolbar>
);

export default DataTableToolbar;
