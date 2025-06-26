import React from 'react';
import { Button, CircularProgress, Box, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import Grid from '@mui/material/Grid'; // ✅ CORRECT
import type { Category } from '../../types/shopping';

type CategorySelectorProps = {
  categories: Category[];
  selectedCategory: string;
  onSelect: (categoryId: string) => void;
  variant?: 'buttons' | 'dropdown';
  loading?: boolean;
};

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  onSelect,
  variant = 'buttons',
  loading = false,
}) => {
  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', my: 2 }}>
        <CircularProgress />
        <Typography variant="body2" sx={{ mt: 1 }}>טוען קטגוריות...</Typography>
      </Box>
    );
  }

  if (variant === 'dropdown') {
    return (
      <FormControl fullWidth>
        <InputLabel id="category-select-label">קטגוריה</InputLabel>
        <Select
          labelId="category-select-label"
          value={selectedCategory ?? ''}
          onChange={(e) => onSelect(e.target.value)}
          label="קטגוריה"
        >
          <MenuItem value="" disabled>
            בחר קטגוריה
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.categoryId} value={category.categoryId}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  // Button group
  return (
    <Grid container spacing={1}>
      {categories.map((category) => (
        <Grid key={category.categoryId} size={{ xs: 12, sm: 6, md: 4 }}>
          <Button
            fullWidth
            variant={selectedCategory === category.categoryId ? 'contained' : 'outlined'}
            color={selectedCategory === category.categoryId ? 'primary' : 'inherit'}
            onClick={() => onSelect(category.categoryId)}
            sx={{ py: 1.5, textAlign: 'center', fontSize: '0.9rem' }}
          >
            {category.name}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default CategorySelector; 


