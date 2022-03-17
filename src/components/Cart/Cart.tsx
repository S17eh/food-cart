import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import { cartItem } from "../../store/CartProvider";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props: {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const ctx = useContext(CartContext);
  const [checkOut, setCheckOut] = useState(false);
  const [isSubmitting, setisSubmitting] = useState(false);
  const [orderPlaced, setorderPlaced] = useState(false);

  const itemRemoveHandler = (item: cartItem) => {
    ctx.removeItem(item);
  };
  const itemAddHandler = (item: cartItem) => {
    ctx.addItem(item);
  };
  const orderHandler = () => {
    setCheckOut(true);
  };

  const PlaceOrder = async (userData: object) => {
    setisSubmitting(true);
    await fetch(
      "https://movies-https-1cdd6-default-rtdb.firebaseio.com/order.json",
      {
        method: "POST",
        body: JSON.stringify({
          User: userData,
          OrderItem: ctx.items,
        }),
      }
    );
    setisSubmitting(false);
    setorderPlaced(true);
    ctx.clearCart();
  };

  const cartItem = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((item: cartItem) => (
        <li key={item.id}>
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

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {ctx.items.length > 0 && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const checkOutModal = (
    <Modal onClose={props.onClose}>
      <div>{cartItem}</div>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${ctx.totalAmount.toFixed(2)}</span>
      </div>
      {checkOut && (
        <Checkout onCancel={props.onClose} onConfirmOrder={PlaceOrder} />
      )}
      {!checkOut && modalActions}
    </Modal>
  );

  const orderPlacedModal = (
    <Modal>
      <div className={classes.actions}>
        <p>Order Placed ✅</p>
        <button
          className={classes.button}
          type="button"
          onClick={props.onClose}
        >
          Close
        </button>
      </div>
    </Modal>
  );

  return (
    <>
      {!isSubmitting && !orderPlaced && checkOutModal}
      {isSubmitting && (
        <Modal>
          <div className={classes.actions}>
            <p>Placing order....</p>
          </div>
        </Modal>
      )}
      {orderPlaced && orderPlacedModal}
    </>
  );
};

export default Cart;
