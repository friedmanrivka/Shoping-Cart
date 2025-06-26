export interface Category {
  categoryId: string
  name: string
  createdAt?: string
}

export interface ShoppingItem {
  id: string
  name: string
  categoryId: string
  quantity: number
}

export interface OrderRequest {
  items: ShoppingItem[]
}

export interface OrderResponse {
  id: string
  message: string
  totalItems: number
  createdAt: string
}

export interface Order {
  id: string
  items: ShoppingItem[]
  totalItems: number
  createdAt: string
}
