import React, { useState } from "react"
import {  Container, Paper,Button,  Typography,  Box, Chip,Alert,CircularProgress,} from "@mui/material"
import { Add, ShoppingCart, Send } from "@mui/icons-material"
import { useGetCategoriesQuery } from "../store/api/shoppingApi"
import { useAppSelector, useAppDispatch } from "../store/hooks"
import { addItem, clearCart, selectCartItems, selectTotalItems } from "../store/slices/cartSlice"
import type { ShoppingItem } from "../types/shopping"
import { validateNewItem } from "../validations/shoppingValidation"
import CategorySelector from "./ui/CategorySelector"
import AddItemForm from "./ui/AddItemForm"
import GroupedProductList from "./ui/GroupedProductList"
import FeedbackSnackbar from "./ui/FeedbackSnackbar"

const ShoppingList: React.FC = () => {
  const [itemName, setItemName] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")

  const dispatch = useAppDispatch()
  const cartItems = useAppSelector(selectCartItems)
  const totalItems = useAppSelector(selectTotalItems)

  const { data: categories = [], isLoading: categoriesLoading } = useGetCategoriesQuery()

  // MOCK: If categories are empty, use hardcoded demo categories
  const demoCategories = [
    { categoryId: "1", name: "פירות וירקות" },
    { categoryId: "2", name: "מאפים" },
    { categoryId: "3", name: "חלב ומוצריו" },
    { categoryId: "4", name: "בשר ודגים" },
    { categoryId: "5", name: "משקאות" },
  ];
  const categoriesToUse = categories.length === 0 ? demoCategories : categories;

  const handleAddItem = () => {
    const error = validateNewItem(itemName, selectedCategory);
    if (error) {
      setSnackbarMessage(error);
      setSnackbarOpen(true);
      return;
    }
    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      name: itemName.trim(),
      categoryId: selectedCategory,
      quantity: 1,
    }
    dispatch(addItem(newItem))
    setItemName("")
    setSelectedCategory("")
    setSnackbarMessage("המוצר נוסף בהצלחה!")
    setSnackbarOpen(true)
  }

  const handleSubmitOrder = async () => {
    // Simulate order submission
    console.log('Simulated order submission. Cart items:', cartItems)
    dispatch(clearCart())
    setSnackbarMessage('Order simulated successfully!')
    setSnackbarOpen(true)
  }

  const getCategoryName = (categoryId: string) => {
    return categoriesToUse.find((cat) => cat.categoryId === categoryId)?.name || "לא ידוע"
  }

  const groupedItems = cartItems.reduce(
    (acc, item) => {
      const categoryName = getCategoryName(item.categoryId)
      if (!acc[categoryName]) {
        acc[categoryName] = []
      }
      acc[categoryName].push(item)
      return acc
    },
    {} as Record<string, ShoppingItem[]>,
  )

  if (categoriesLoading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          טוען קטגוריות...
        </Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom color="primary">
            <ShoppingCart sx={{ fontSize: "inherit", mr: 2 }} />
            רשימת קניות חכמה
          </Typography>
          <Chip
            label={`סה\"כ מוצרים בסל: ${totalItems}`}
            color="secondary"
            sx={{ fontSize: "1.1rem", py: 2 }}
          />
        </Box>

        {/* Add Item Form */}
        <Paper elevation={2} sx={{ p: 3, mb: 4, bgcolor: "grey.50" }}>
          <Typography variant="h5" gutterBottom>
            הוסף מוצר חדש
          </Typography>
          <AddItemForm
            itemName={itemName}
            setItemName={setItemName}
            selectedCategory={selectedCategory}
            onAdd={handleAddItem}
            disabled={categoriesToUse.length === 0}
          >
            <CategorySelector
              categories={categoriesToUse}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
              variant="buttons"
              loading={categoriesLoading}
            />
          </AddItemForm>
        </Paper>

        {/* Shopping List */}
        {Object.keys(groupedItems).length > 0 ? (
          <GroupedProductList
            groupedItems={groupedItems}
            getCategoryName={(name) => name}
            showCounter={true}
          />
        ) : (
          <Alert severity="info" sx={{ mb: 4 }}>
            הסל ריק - הוסף מוצרים כדי להתחיל
          </Alert>
        )}

        {/* Submit Order Button */}
        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleSubmitOrder}
            disabled={cartItems.length === 0}
            startIcon={<Send />}
            sx={{ px: 4, py: 2, fontSize: "1.1rem" }}
          >
            סיים הזמנה
          </Button>
        </Box>
      </Paper>

      <FeedbackSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
      />
    </Container>
  )
}

export default ShoppingList