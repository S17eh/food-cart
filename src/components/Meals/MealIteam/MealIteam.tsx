import React, { useContext } from "react";
import CartContext from "../../../store/cart-context";
import AmountForm from "./AmountForm";
import classes from "./MealItem.module.css";

interface MealData {
  name: string;
  description: string;
  price: number;
  id: string;
}

const MealIteam = (props: MealData) => {
  const price: string = `$${props.price.toFixed(2)}`;

  const ctx = useContext(CartContext);
  const addToCartHandler = (amount: number) => {
    ctx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <div className={classes.meal}>
      <li>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </li>
      <div>
        <AmountForm onAddToCart={addToCartHandler} id={props.id} />
      </div>
    </div>
  );
};

export default MealIteam;
