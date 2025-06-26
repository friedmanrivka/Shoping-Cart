import { configureStore } from "@reduxjs/toolkit"
import { shoppingApi } from "./api/shoppingApi"
import cartReducer from "./slices/cartSlice"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [shoppingApi.reducerPath]: shoppingApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shoppingApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
