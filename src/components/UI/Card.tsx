import React from "react";
import classes from "./Card.module.css";

const Card = (props: {
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {
  return <div className={classes.card}>{props.children}</div>;
};

export default Card;
