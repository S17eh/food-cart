import React, { useReducer } from "react";
import CartContext from "./cart-context";

export interface cartItem {
  id: string;
  name: string;
  price: number;
  amount: number;
}

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (
  state: { items: cartItem[]; totalAmount: number },
  action: { type: string; item?: cartItem | any }
) => {
  if (action.type === "ADD") {
    const existingItemIndex = state.items.findIndex((item) => {
      return item.id === action.item.id;
    });
    const existingItem = state.items[existingItemIndex];
    let updatedItems;
    let updatedTotalAmount;

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
      updatedTotalAmount = state.totalAmount + action.item.price;
    } else {
      updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: +updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingItemIndex = state.items.findIndex((item) => {
      return item.id === action.item.id;
    });
    const existingItem = state.items[existingItemIndex];
    const updatedTotalAmount = state.totalAmount - action.item.price;
    let updatedItems;

    if (action.item.amount === 1) {
      updatedItems = state.items.filter((item) => {
        return item.id !== action.item.id;
      });
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: +updatedTotalAmount,
    };
  }
  return defaultCartState;
};

const CartProvider = (props: {
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal;
}) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addToCart = (item: cartItem) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeFromCart = (item: cartItem) => {
    dispatchCartAction({ type: "REMOVE", item: item });
  };
  const clearCart = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const InitialCart = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addToCart,
    removeItem: removeFromCart,
    clearCart: clearCart,
  };

  return (
    <CartContext.Provider value={InitialCart}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
