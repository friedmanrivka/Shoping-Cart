import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Category, OrderRequest, OrderResponse } from "../../types/shopping"
export const shoppingApi = createApi({
  reducerPath: "shoppingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json")
      return headers
    },
  }),
  tagTypes: ["Categories", "Orders"],
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => "/categories",
      providesTags: ["Categories"],
      keepUnusedDataFor: 300, 
    }),
    submitOrder: builder.mutation<OrderResponse, OrderPayload>({
      query: (orderData) => ({
        url: "/carts",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
})

export const { useGetCategoriesQuery, useSubmitOrderMutation } = shoppingApi

// Add a type for the order payload matching the backend
export interface OrderItemPayload {
  productName: string;
  quantity: number;
  categoryId: number;
}
export interface OrderPayload {
  userId: string;
  items: OrderItemPayload[];
}
