import React from 'react';
import { Snackbar } from '@mui/material';

type FeedbackSnackbarProps = {
  open: boolean;
  message: string;
  onClose: () => void;
  autoHideDuration?: number;
};

const FeedbackSnackbar: React.FC<FeedbackSnackbarProps> = ({ open, message, onClose, autoHideDuration = 3000 }) => (
  <Snackbar
    open={open}
    autoHideDuration={autoHideDuration}
    onClose={onClose}
    message={message}
  />
);

export default FeedbackSnackbar; 