import { createListWithItems as repoFunc } from "./repository";

export const createListWithItems = async (data: {
  items: { productName: string; quantity: number; categoryId: number }[];
}) => {
  return await repoFunc(data);
};

// export const addItemToList = async (
//   listId: number,
//   itemData: { productName: string; quantity: number; categoryId: number }
// ) => {
//   return await addItemRepo(listId, itemData);
// };
// export const getItemsFilteredByCategory = async (categoryId: number) => {
//   return await getItemCategory(categoryId);
// };