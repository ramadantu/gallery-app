import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteImageById, updateImageById } from '../../api/images';
import { useState } from 'react';
import { ErrorHandler } from '../ErrorHandler';

export const EditImageDialog = ({ id, open, setOpen, data, setOnSuccess }) => {
  const [responseError, setResponseError] = useState(null);

  const title = data.title;
  const description = data.description;

  const handleClose = () => setOpen(false);

  const onUpdateImage = async (title, description) => {
    try {
      setResponseError(null);
      await updateImageById({ id: data.id, title, description });
      setOnSuccess(true);
      handleClose();
    } catch (error) {
      setResponseError({ type: 'error', message: 'Error updating image' });
    }
  };

  const onDeleteImage = async () => {
    try {
      setResponseError(null);
      await deleteImageById(data.id);
      setOnSuccess(true);
      handleClose();
    } catch (error) {
      setResponseError({ type: 'error', message: 'Error deleting image' });
    }
  };

  return (
    <Dialog
      id={id}
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: async (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          const title = formJson.title;
          const description = formJson.description;
          await onUpdateImage(title, description);
        },
      }}
    >
      <DialogTitle id={`${id}-title`}>Edit Image</DialogTitle>
      <DialogContent id={`${id}-content`}>
        <ErrorHandler id={`${id}-error`} error={responseError} />
        <TextField
          id={`${id}-text-field-title`}
          required
          defaultValue={title}
          margin='dense'
          name='title'
          label='Title'
          fullWidth
          variant='standard'
        />
        <TextField
          id={`${id}-text-field-description`}
          required
          defaultValue={description}
          margin='dense'
          name='description'
          label='Description'
          fullWidth
          variant='standard'
        />
      </DialogContent>
      <DialogActions id={`${id}-actions`}>
        <Button id={`${id}-button-cancel`} onClick={handleClose}>
          Cancel
        </Button>
        <Button id={`${id}-button-submit`} type='submit'>
          Submit
        </Button>
        <Button id={`${id}-button-delete`} variant='contained' color='error' onClick={onDeleteImage}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
