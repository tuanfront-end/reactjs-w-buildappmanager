import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MTForm from 'components/MTForm/MTForm';
import { MTFormItem } from 'components/MTForm/types';
import { Close, Search } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

export interface FormDialogProps {
  onSubmit?: Function;
  searchFormData: MTFormItem[];
}

export default function FormDialog({ onSubmit, searchFormData }: FormDialogProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderSubmit = () => {
    return (
      <Button type="submit" variant="contained" color="secondary" size="large" startIcon={<Search />}>
        Search
      </Button>
    );
  };

  return (
    <div>
      <Button variant="outlined" style={{ color: 'white' }} onClick={handleClickOpen} startIcon={<Search />}>
        Open form Search
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullScreen>
        <IconButton
          color="primary"
          size="medium"
          aria-label="upload picture"
          className="absolute top-1 right-1"
          style={{ position: 'absolute' }}
          onClick={handleClose}
        >
          <Close fontSize="large" />
        </IconButton>
        <DialogContent>
          <h3 className="mt3 mb1">Smart Search</h3>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates occasionally.
          </DialogContentText>

          <MTForm
            data={searchFormData}
            renderSubmit={renderSubmit}
            onSubmit={e => {
              handleClose();
              onSubmit?.(e);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
