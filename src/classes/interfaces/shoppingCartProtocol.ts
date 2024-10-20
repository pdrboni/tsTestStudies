import { CartItem } from "./cartItem";

export interface ShoppingCartProtocol {
  addItem(item: CartItem): void;
  removeItem(index: number): void;
  total(): number;
  totalWithDiscount(): number;
  isEmpty(): boolean;
  clear(): void;
  items: Readonly<CartItem>[];
}
