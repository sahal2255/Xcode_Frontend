import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const CommonModal = ({ isVisible, onClose, title, children }) => {
  return (
    <Dialog
      open={isVisible}
      onClose={onClose}
      fullWidth
      maxWidth="sm" // Adjust size as needed (e.g., 'xs', 'md', 'lg')
    >
      {/* Title Section */}
      <DialogTitle>{title}</DialogTitle>

      {/* Content Section */}
      <DialogContent>
        {children}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommonModal;
