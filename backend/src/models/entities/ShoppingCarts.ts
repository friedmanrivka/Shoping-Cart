import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CartItems } from "./CartItems";

@Index("PK__Shopping__51BCD7B781C5ADDB", ["cartId"], { unique: true })
@Entity("ShoppingCarts", { schema: "dbo" })
export class ShoppingCarts {
  @PrimaryGeneratedColumn({ type: "int", name: "CartId" })
  cartId!: number;

  @Column("datetime", { name: "CreatedAt", default: () => "getdate()" })
  createdAt!: Date;

  @OneToMany(() => CartItems, (cartItems) => cartItems.cart)
  cartItems!: CartItems[];
}