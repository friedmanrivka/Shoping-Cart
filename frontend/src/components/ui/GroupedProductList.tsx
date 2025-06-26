import React from 'react';
import { Paper, Box, Typography, Chip } from '@mui/material';
import type { ShoppingItem, Category } from '../../types/shopping';

type GroupedProductListProps = {
  groupedItems: Record<string, ShoppingItem[]>;
  categoryCounters?: Record<string, number>;
  categories?: Category[];
  showCounter?: boolean;
  getCategoryName: (categoryId: string) => string;
};

const GroupedProductList: React.FC<GroupedProductListProps> = ({
  groupedItems,
  categoryCounters = {},
  categories,
  showCounter = true,
  getCategoryName,
}) => {
  // If categories are provided, use their order; otherwise, use groupedItems keys
  const categoryOrder = categories
    ? categories.filter(cat => groupedItems[getCategoryName(cat.categoryId)])
    : Object.keys(groupedItems).map(name => ({ id: name, name }));

  return (
    <Box sx={{ mb: 4 }}>
      {categoryOrder.map((category: any) => {
        const categoryName = getCategoryName(category.id || category.name);
        const items = groupedItems[categoryName];
        if (!items) return null;
        return (
          <Paper key={category.id || categoryName} elevation={1} sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="h6" color="primary" gutterBottom sx={{ flexGrow: 1 }}>
                {categoryName}
              </Typography>
              {showCounter && (
                <Chip
                  label={`${categoryCounters[category.id] ?? items.length} מוצרים`}
                  color="secondary"
                  size="small"
                  sx={{ ml: 1 }}
                />
              )}
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {items.map((item) => (
                <Chip
                  key={item.id}
                  label={`${item.name}${item.quantity > 1 ? ` (${item.quantity})` : ''}`}
                  variant="outlined"
                  color="primary"
                />
              ))}
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
};

export default GroupedProductList; 