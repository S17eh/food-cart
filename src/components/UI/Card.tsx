import React from "react";
import classes from "./Card.module.css";
import { InputWrapperProps } from "./Modal";

const Card = (props: InputWrapperProps) => {
  return <div className={classes.card}>{props.children}</div>;
};

export default Card;
