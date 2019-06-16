import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

const DetailDialog = ({ onConfirm, onCancel, title }) => {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <Dialog open={true} onClose={onCancel} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent />
      <DialogActions>
        <Button onClick={onCancel} color="default">
          Cancel
        </Button>
        <Button
          onClick={() => setConfirmed(true) && onConfirm()}
          color="secondary"
          disabled={confirmed}
          autoFocus
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetailDialog;
