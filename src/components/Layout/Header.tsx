import React from "react";
import classes from "./Header.module.css";
import mealImg from "../../assets/meals.jpg";
import CartButton from "./CartButton";

const Header: React.FC = () => {
  return (
    <>
      <header className={classes.header}>
        <h1>FlashFoodies !</h1>
        <CartButton/>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealImg} alt="Delicious food...." />
      </div>
    </>
  );
};

export default Header;
