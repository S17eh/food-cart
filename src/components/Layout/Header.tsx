import React from "react";
import classes from "./Header.module.css";
import mealImg from "../../assets/meals.jpg";
import CartButton from "./CartButton";

const Header = (props: {
  onShow: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <>
      <header className={classes.header}>
        <h1>FlashFoodies !</h1>
        <CartButton onClick={props.onShow} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealImg} alt="Delicious food...." />
      </div>
    </>
  );
};

export default Header;
