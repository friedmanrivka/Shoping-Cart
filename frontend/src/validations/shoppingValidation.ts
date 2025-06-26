export function validateNewItem(name: string, categoryId: string): string | null {
  if (!name.trim()) return "Item name is required."
  if (!categoryId.trim()) return "Category is required."
  return null
}

export function validateCartNotEmpty(items: unknown[]): string | null {
  if (!items || items.length === 0) {
    return "Cart is empty. Add items before submitting."
  }
  return null
}