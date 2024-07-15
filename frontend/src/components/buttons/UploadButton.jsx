import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const UploadButton = ({ id, setImageFile }) => {
  return (
    <Button id={id} component='label' variant='contained' tabIndex={-1} startIcon={<CloudUploadIcon id={`${id}-icon`} />}>
      Upload image
      {/* eslint-disable-next-line */}
      <VisuallyHiddenInput type='file' onInput={(event) => setImageFile(event.target.files[0])} />
    </Button>
  );
};
