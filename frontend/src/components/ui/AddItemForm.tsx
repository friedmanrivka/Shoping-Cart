import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import { Add } from '@mui/icons-material';

type AddItemFormProps = {
  itemName: string;
  setItemName: (name: string) => void;
  selectedCategory: string;
  onAdd: () => void;
  disabled?: boolean;
  children?: React.ReactNode; 
};

const AddItemForm: React.FC<AddItemFormProps> = ({
  itemName,
  setItemName,
  selectedCategory,
  onAdd,
  disabled = false,
  children,
}) => (
  <Box>
    <Box sx={{ mb: 2 }}>
      {children}
    </Box>
    {selectedCategory && (
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="שם המוצר"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onAdd()}
          variant="outlined"
          dir="rtl"
          autoFocus
        />
      </Box>
    )}
    {selectedCategory && (
      <Box sx={{ textAlign: 'center' }}>
        <Button
          variant="contained"
          onClick={onAdd}
          startIcon={<Add />}
          size="large"
          sx={{ px: 4, py: 1.5 }}
          disabled={disabled}
        >
          הוסף מוצר
        </Button>
      </Box>
    )}
  </Box>
);

export default AddItemForm; 