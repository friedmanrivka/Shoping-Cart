import { DataSource } from "typeorm";
import { CartItems } from "../models/entities/CartItems"; 
import { Categories } from "../models/entities/Categories";
import { ShoppingCarts } from "../models/entities/ShoppingCarts";

export const AppDataSource = new DataSource({
  type: "mssql",
  host: "localhost",
  port: 1433,
  username: "sa",
  password: "214787673",
  database: "shopping",
  synchronize: true,
  entities: [Categories, CartItems,ShoppingCarts],
  options: {
  enableArithAbort: true,
  encrypt: true,
  },
});

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to the database successfully!");
  })
  .catch((err) => {
    console.error(" Failed to connect to the database."); 
    console.error("Error details:", err.message);
  });