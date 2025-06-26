import { AppDataSource } from "../../config/database";
import { ShoppingCarts } from "../../models/entities/ShoppingCarts";
import { CartItems } from "../../models/entities/CartItems";

const listRepo = AppDataSource.getRepository(ShoppingCarts);
const itemRepo = AppDataSource.getRepository(CartItems);

export const createListWithItems = async (data: {
  items: { productName: string; quantity: number; categoryId: number }[];
}) => {
  try {
    // Step 1: Create empty cart
    const list = listRepo.create({});
    const savedList = await listRepo.save(list);

    // Step 2: Create items linked to the cart
    const items = data.items.map((item) =>
      itemRepo.create({
        productName: item.productName,
        quantity: item.quantity,
        category: { categoryId: item.categoryId },
        cart: savedList,
      })
    );

    await itemRepo.save(items);

    return { ...savedList, items };
  } catch (error) {
    console.error("Error creating list with items:", error);
    throw new Error("Failed to create list with items");
  }
};

// export const addItemToList = async (
//   listId: number,
//   itemData: { productName: string; quantity: number; categoryId: number }
// ) => {
//   const list = await listRepo.findOneBy({ cartId: listId });
//   if (!list) throw new Error("List not found");

//   const item = itemRepo.create({
//     productName: itemData.productName,
//     quantity: itemData.quantity,
//     category: { categoryId: itemData.categoryId },
//     cart: list,
//   });

//   return await itemRepo.save(item);
// };

// export const getItemsByCategory = async (categoryId: number) => {
//   return await itemRepo.find({
//     where: { category: { categoryId } }, 
//     relations: ["category", "cart"], 
//   });
// };