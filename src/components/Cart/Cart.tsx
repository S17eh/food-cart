import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
import { cartItem } from "../../store/CartProvider";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props: {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const ctx = useContext(CartContext);
  const itemRemoveHandler = (item: cartItem) => {
    ctx.removeItem(item);
  };
  const itemAddHandler = (item: cartItem) => {
    ctx.addItem(item);
  };

  const cartItem = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((item: cartItem) => (
        <li>
          <CartItem
            onRemove={itemRemoveHandler.bind(null, item)}
            onAdd={itemAddHandler.bind(null, item)}
            id={item.id}
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
          />
        </li>
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      <div>{cartItem}</div>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${ctx.totalAmount.toFixed(2)}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {ctx.items.length !== 0 && (
          <button className={classes.button}>Order</button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
