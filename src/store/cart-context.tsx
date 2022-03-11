import React from "react";
import { cartItem } from "./CartProvider";

const CartContext = React.createContext({
  items: [{ id: "none", name: "none", amount: 0, price: 0 }],
  totalAmount: 0,
  addItem: (item: cartItem) => {},
  removeItem: (item: cartItem) => {},
});

export default CartContext;
