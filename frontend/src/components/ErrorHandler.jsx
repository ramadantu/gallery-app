import React, { useEffect, useState } from 'react';
import { Alert, AlertTitle, Collapse, Snackbar, Box } from '@mui/material';
import '../../src/css/components/ErrorHandler.css';

const GlobalAlert = ({ id, open, setOpen, alertType, alertMessage }) => {
  return (
    <Snackbar
      id={`${id}-snackbar`}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={open}
      autoHideDuration={5000}
      onClose={(event, reason) => {
        reason !== 'clickaway' && setOpen(false);
      }}
    >
      <Alert id={id} severity={alertType} onClose={() => setOpen(false)} sx={{ width: '100%' }}>
        {alertMessage}
      </Alert>
    </Snackbar>
  );
};

const TransitionAlert = ({ id, open, setOpen, alertType, alertMessage }) => {
  return (
    <Box id={`${id}-box`} sx={{ width: '100%' }}>
      <Collapse id={`${id}-collapse`} in={open} timeout='auto'>
        <Alert id={id} severity={alertType} onClose={() => setOpen(false)} sx={{ mb: 2 }}>
          <AlertTitle id={`${id}-title`} className='alert-title'>
            {alertType}
          </AlertTitle>
          {alertMessage}
        </Alert>
      </Collapse>
    </Box>
  );
};

const ErrorHandler = ({ id, error, showGlobalAlert }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(!!error);
  }, [error]);

  return (
    error &&
    (showGlobalAlert ? (
      <GlobalAlert id={`${id}-global-alert`} open={open} setOpen={setOpen} alertType={error.type} alertMessage={error.message} />
    ) : (
      <TransitionAlert id={`${id}-transition-alert`} open={open} setOpen={setOpen} alertType={error.type} alertMessage={error.message} />
    ))
  );
};

export { ErrorHandler };
