import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./CartButton.module.css";

const CartButton = (props: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const ctx = useContext(CartContext);
  const [buttonAnimation, setButtonAnimation] = useState(false);
  const noOfCartItems = ctx.items.reduce((current, item) => {
    return current + item.amount;
  }, 0);

  const btnClass = `${classes.button} ${
    buttonAnimation ? classes.bump : null
  } `;
  useEffect(() => {
    if (ctx.items.length === 0) {
      return;
    }
    setButtonAnimation(true);

    const timer = setTimeout(() => {
      setButtonAnimation(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [ctx.items]);

  return (
    <button className={btnClass} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{noOfCartItems}</span>
    </button>
  );
};

export default CartButton;
