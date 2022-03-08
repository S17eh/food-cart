import React from "react";
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
  return (
    <div className={classes.meal}>
      <li>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </li>
      <div>
        <AmountForm id={props.id} />
      </div>
    </div>
  );
};

export default MealIteam;
