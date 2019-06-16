import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

const DetailDialog = ({
  onCancel,
  title,
  open,
  formName,
  submitting,
  children,
}) => {
  return (
    <Dialog
      fullWidth={true}
      maxWidth="sm"
      open={open}
      onClose={onCancel}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="default">
          Cancel
        </Button>
        <Button
          type="submit"
          form={formName}
          color="secondary"
          disabled={submitting}
          autoFocus
        >
          {submitting ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetailDialog;
