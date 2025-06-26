import { Router } from "express";
import { getAllCategories } from "./service";

const router = Router();

router.get("/", async (req, res) => {
  try {
    console.log("get categories in routes")
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;