import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Categories } from "./Categories";
import { ShoppingCarts } from "./ShoppingCarts";

@Index("PK__CartItem__727E838B1ACEE4E3", ["itemId"], { unique: true })
@Entity("CartItems", { schema: "dbo" })
export class CartItems {
  @PrimaryGeneratedColumn({ type: "int", name: "ItemId" })
  itemId!: number;

  @Column("nvarchar", { name: "ProductName", length: 100 })
  productName!: string;

  @Column("int", { name: "Quantity" })
  quantity!: number;

  @ManyToOne(() => Categories, (categories) => categories.cartItems)
  @JoinColumn([{ name: "CategoryId", referencedColumnName: "categoryId" }])
  category!: Categories;

  @ManyToOne(() => ShoppingCarts, (shoppingCarts) => shoppingCarts.cartItems, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "CartId", referencedColumnName: "cartId" }])
  cart!: ShoppingCarts;
}
