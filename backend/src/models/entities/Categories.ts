import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CartItems } from "./CartItems";

@Index("PK__Categori__19093A0B0B20E0D6", ["categoryId"], { unique: true })
@Entity("Categories", { schema: "dbo" })
export class Categories {
  @PrimaryGeneratedColumn({ type: "int", name: "CategoryId" })
  categoryId!: number;

  @Column("nvarchar", { name: "Name", length: 100 })
  name!: string;

  @OneToMany(() => CartItems, (cartItems) => cartItems.category)
  cartItems!: CartItems[];
}