import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { UploadButton } from '../buttons/UploadButton';
import { useState } from 'react';
import { createImage } from '../../api/images';
import { ErrorHandler } from '../ErrorHandler';

export const CreateImageDialog = ({ id, open, setOpen, setOnSuccess }) => {
  const [responseError, setResponseError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const handleClose = () => setOpen(false);

  const onCreateImage = (data, file) => {
    try {
      setResponseError(null);
      const reader = new FileReader();
      reader.onloadend = async () => {
        await createImage(data, file);
        setOnSuccess(true);
        handleClose();
      };
      reader.readAsDataURL(file);
    } catch (error) {
      setResponseError({ type: 'error', message: 'Error creating image' });
    }
  };

  return (
    <Dialog
      id={id}
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          const title = formJson.title;
          const description = formJson.description;
          onCreateImage({ title, description }, imageFile);
        },
      }}
    >
      <DialogTitle id={`${id}-title`}>Subscribe</DialogTitle>
      <DialogContent id={`${id}-content`}>
        <ErrorHandler id={`${id}-error`} error={responseError} />
        <UploadButton id={`${id}-button-upload`} setImageFile={setImageFile} />
        <TextField id={`${id}-text-field-title`} required margin='dense' name='title' label='Title' fullWidth variant='standard' />
        <TextField id={`${id}-text-field-description`} required margin='dense' name='description' label='Description' fullWidth variant='standard' />
      </DialogContent>
      <DialogActions id={`${id}-actions`}>
        <Button id={`${id}-button-cancel`} onClick={handleClose}>
          Cancel
        </Button>
        <Button id={`${id}-button-submit`} type='submit'>
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
};
