import { getAllCategories as getAllCategoriesRepo } from "./repository";

export const getAllCategories = async () => {
  return await getAllCategoriesRepo();
};
