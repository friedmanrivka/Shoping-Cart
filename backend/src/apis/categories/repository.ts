import { AppDataSource } from "../../config/database";
import { Categories } from "../../models/entities/Categories";

const categoryRepo = AppDataSource.getRepository(Categories);

export const getAllCategories = async () => {
  try {
    console.log("before action to db in repo")
    return await categoryRepo.find();
  } catch (error) {
    console.error("Error fetching categories from database:", error);
    throw new Error("Failed to fetch categories");
  }
};