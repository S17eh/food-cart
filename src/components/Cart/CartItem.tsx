import { cartItem } from "../../store/CartProvider";
import classes from "./CartItem.module.css";

interface cart extends cartItem {
  onRemove: any;
  onAdd: any;
}

const CartItem = (props: cart) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <div className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </div>
  );
};

export default CartItem;
