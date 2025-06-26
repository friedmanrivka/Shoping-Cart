import React, { useState } from "react"
import {Container,Paper, Typography, Box, Chip, Alert, CircularProgress,} from "@mui/material"
import { ShoppingCart, Send } from "@mui/icons-material"
import { useGetCategoriesQuery, useSubmitOrderMutation } from "../store/api/shoppingApi"
import { useAppSelector, useAppDispatch } from "../store/hooks"
import { addItem, clearCart, selectCartItems, selectTotalItems } from "../store/slices/cartSlice"
import type { ShoppingItem, Category } from "../types/shopping"
import { validateNewItem } from "../validations/shoppingValidation"
import CategorySelector from "./ui/CategorySelector"
import AddItemForm from "./ui/AddItemForm"
import GroupedProductList from "./ui/GroupedProductList"
import FeedbackSnackbar from "./ui/FeedbackSnackbar"

const ShoppingListFixed: React.FC = () => {
  const [itemName, setItemName] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")

  const dispatch = useAppDispatch()
  const cartItems = useAppSelector(selectCartItems)
  const totalItems = useAppSelector(selectTotalItems)

  const { data: categories, isLoading: categoriesLoading, isError: categoriesError } = useGetCategoriesQuery()
  const [submitOrder, { isLoading: isSubmitting }] = useSubmitOrderMutation();

  const handleAddItem = () => {
    const error = validateNewItem(itemName, selectedCategory);
    if (error) {
      setSnackbarMessage(error)
      setSnackbarOpen(true)
      return
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
    try {
      const userId = "demo-user";
      const orderData = {
        userId,
        items: cartItems.map(item => ({
          productName: item.name,
          quantity: item.quantity,
          categoryId: Number(item.categoryId),
        })),
      };
      await submitOrder(orderData).unwrap();
      dispatch(clearCart());
      setSnackbarMessage('ההזמנה נשלחה בהצלחה!');
    } catch (error: any) {
      setSnackbarMessage('שגיאה בשליחת ההזמנה לשרת');
    }
    setSnackbarOpen(true);
  }

  const getCategoryName = (categoryId: string) =>
    (categories?.find((cat) => cat.categoryId === categoryId)?.name) || "לא ידוע"

  const groupedItems = cartItems.reduce((acc, item) => {
    const categoryName = getCategoryName(item.categoryId)
    if (!acc[categoryName]) {
      acc[categoryName] = []
    }
    acc[categoryName].push(item)
    return acc
  }, {} as Record<string, ShoppingItem[]>)

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
  if (categoriesError) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
        <Alert severity="error">שגיאה בטעינת קטגוריות מהשרת</Alert>
      </Container>
    );
  }
  if (!categories || categories.length === 0) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
        <Alert severity="info">לא נמצאו קטגוריות</Alert>
      </Container>
    );
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
            label={`סה"כ: ${totalItems} מוצרים בסל`}
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
            disabled={categories.length === 0}
          >
            <CategorySelector
              categories={categories}
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
          <button
            style={{
              background: '#9c27b0', color: 'white', fontSize: '1.1rem', padding: '12px 32px', border: 'none', borderRadius: 4, cursor: 'pointer'
            }}
            onClick={handleSubmitOrder}
            disabled={cartItems.length === 0 || isSubmitting}
          >
            {isSubmitting ? "שולח..." : "סיים הזמנה"}
          </button>
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

export default ShoppingListFixed;