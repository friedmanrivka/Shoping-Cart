import { Router } from "express";
import { createListWithItems } from "./service";
import { validateCreateList } from "../../utils/validate";

const router = Router();

router.post("/carts", async (req, res, next) => {
  try {
    validateCreateList(req.body); 
    const result = await createListWithItems(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});
// router.post("/:id/items", async (req, res, next) => {
//   try {
//     validateCreateList(req.body); 
//     const { id } = req.params;
//     const newItem = await addItemToList(Number(id), req.body);
//     res.status(201).json(newItem);
//   } catch (err) {
//     next(err);
//   }
// });




// router.get("/items", async (req, res, next) => {
//   try {
//     validateCreateList(req.body); 
//     const categoryId = Number(req.query.categoryId);
//      const items = await getItemsFilteredByCategory(categoryId);
//     res.json(items);
//   } catch (err) {
//     next(err);
//   }
// });

 export default router;