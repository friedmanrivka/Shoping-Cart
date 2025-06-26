import React, { useState } from "react"
import {Button,Container,Paper,Typography, Box, Chip, Alert, CircularProgress,} from "@mui/material"
import { Add, ShoppingCart, Send } from "@mui/icons-material"
import { useAppSelector, useAppDispatch } from "../store/hooks"
import { addItem, clearCart, selectCartItems, selectTotalItems, selectCategoryCounters, selectGlobalCounter } from "../store/slices/cartSlice"
import type { ShoppingItem, Category } from "../types/shopping"
import { validateNewItem } from "../validations/shoppingValidation"
import CategorySelector from "./ui/CategorySelector"
import AddItemForm from "./ui/AddItemForm"
import GroupedProductList from "./ui/GroupedProductList"
import FeedbackSnackbar from "./ui/FeedbackSnackbar"
import { useGetCategoriesQuery, useSubmitOrderMutation } from "../store/api/shoppingApi"

const ShoppingListSimple: React.FC = () => {
  const [itemName, setItemName] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")

  const dispatch = useAppDispatch()
  const cartItems = useAppSelector(selectCartItems)
  const totalItems = useAppSelector(selectTotalItems)
  const categoryCounters = useAppSelector(selectCategoryCounters)
  const globalCounter = useAppSelector(selectGlobalCounter)

  // Use RTK Query to fetch categories
  const { data: categoriesData, isLoading: categoriesLoading, isError: categoriesError } = useGetCategoriesQuery()
  const categories = categoriesData || [];

  const [submitOrder, { isLoading: isSubmitting }] = useSubmitOrderMutation();

  const handleAddItem = () => {
    const error = validateNewItem(itemName, selectedCategory);
    if (error) {
      setSnackbarMessage(error)
      setSnackbarOpen(true)
      return
    }
    // Check if item with same name and category exists
    const existingItem = cartItems.find(
      (item) =>
        item.name.trim().toLowerCase() === itemName.trim().toLowerCase() &&
        item.categoryId === selectedCategory
    )
    if (existingItem) {
      dispatch({
        type: 'cart/updateQuantity',
        payload: { id: existingItem.id, quantity: existingItem.quantity + 1 }
      })
      setSnackbarMessage("הכמות עודכנה!")
    } else {
      const newItem: ShoppingItem = {
        id: Date.now().toString(),
        name: itemName.trim(),
        categoryId: selectedCategory,
        quantity: 1,
      }
      dispatch(addItem(newItem))
      setSnackbarMessage("המוצר נוסף בהצלחה!")
    }
    setItemName("")
    setSelectedCategory("")
    setSnackbarOpen(true)
  }

  const handleSubmitOrder = async () => {
    try {
      // You may want to get userId from auth or prompt; here we use a placeholder
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

  const getCategoryName = (categoryId: string) => {
    return categories.find((cat) => cat.categoryId === categoryId)?.name || "לא ידוע"
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
  if (categoriesError) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
        <Alert severity="error">שגיאה בטעינת קטגוריות מהשרת</Alert>
      </Container>
    );
  }
  if (categories.length === 0) {
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
            label={`סה"כ: ${globalCounter} מוצרים בכל הקטגוריות`}
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
            categoryCounters={categoryCounters}
            categories={categories}
            getCategoryName={getCategoryName}
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
            disabled={cartItems.length === 0 || isSubmitting}
            startIcon={<Send />}
            sx={{ px: 4, py: 2, fontSize: "1.1rem" }}
          >
            {isSubmitting ? "שולח..." : "סיים הזמנה"}
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

export default ShoppingListSimple