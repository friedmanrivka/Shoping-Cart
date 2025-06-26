export const validateCreateList = (data: any) => {
  if (!data.userId || typeof data.userId !== "string") {
    throw new Error("userId is required and must be a string");
  }

  if (data.title && typeof data.title !== "string") {
    throw new Error("title must be a string");
  }
};



export const validateCreateItemInList = (data: any) => {
  if (!data.name || typeof data.name !== "string") {
    throw new Error("Item name is required and must be a string");
  }

  if (
    data.quantity === undefined ||
    typeof data.quantity !== "number" ||
    data.quantity <= 0
  ) {
    throw new Error("Quantity is required and must be a positive number");
  }

  if (
    data.categoryId === undefined ||
    typeof data.categoryId !== "number"
  ) {
    throw new Error("categoryId is required and must be a number");
  }
};
