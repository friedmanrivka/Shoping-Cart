import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"
import type { ShoppingItem } from "../../types/shopping"

interface CartState {
  items: ShoppingItem[]
  categoryCounters: Record<string, number>
  totalCounter: number
}

const initialState: CartState = {
  items: [],
  categoryCounters: {},
  totalCounter: 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ShoppingItem>) => {
      const existingItem = state.items.find(
        (item) =>
          item.name.toLowerCase() === action.payload.name.toLowerCase() &&
          item.categoryId === action.payload.categoryId,
      )

      if (existingItem) {
        existingItem.quantity += 1
        state.categoryCounters[existingItem.categoryId] = (state.categoryCounters[existingItem.categoryId] || 0) + 1
        state.totalCounter += 1
      } else {
        state.items.push(action.payload)
        state.categoryCounters[action.payload.categoryId] = (state.categoryCounters[action.payload.categoryId] || 0) + 1
        state.totalCounter += 1
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload)
      if (item) {
        state.totalCounter -= item.quantity
        state.categoryCounters[item.categoryId] = (state.categoryCounters[item.categoryId] || 0) - item.quantity
        if (state.categoryCounters[item.categoryId] < 0) state.categoryCounters[item.categoryId] = 0
      }
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find((item) => item.id === action.payload.id)
      if (item) {
        const diff = action.payload.quantity - item.quantity
        item.quantity = action.payload.quantity
        state.categoryCounters[item.categoryId] = (state.categoryCounters[item.categoryId] || 0) + diff
        state.totalCounter += diff
        if (state.categoryCounters[item.categoryId] < 0) state.categoryCounters[item.categoryId] = 0
        if (state.totalCounter < 0) state.totalCounter = 0
      }
    },
    clearCart: (state) => {
      state.items = []
      state.categoryCounters = {}
      state.totalCounter = 0
    },
  },
})

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions

// Selectors
export const selectCartItems = (state: RootState) => state.cart.items
export const selectTotalItems = (state: RootState) => state.cart.items.reduce((total, item) => total + item.quantity, 0)
export const selectCategoryCounters = (state: RootState) => state.cart.categoryCounters
export const selectGlobalCounter = (state: RootState) => state.cart.totalCounter

export default cartSlice.reducer
