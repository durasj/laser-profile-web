import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

const ConfirmationDialog = ({ onConfirm, onCancel, description }) => {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <Dialog open={true} onClose={onCancel} aria-labelledby="alert-dialog-title">
      <DialogTitle id="alert-dialog-title">{description}</DialogTitle>
      <DialogActions>
        <Button onClick={onCancel} color="default">
          Cancel
        </Button>
        <Button
          onClick={() => setConfirmed(true) && onConfirm()}
          color="primary"
          disabled={confirmed}
          autoFocus
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
