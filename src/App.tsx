import React, { useState } from "react";
import "./App.css";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [showCart, setShowCart] = useState(false);

  const cartOpener = (): void => {
    setShowCart(true);
  };
  const cartCloser = (): void => {
    setShowCart(false);
  };

  return (
    <CartProvider>
      {showCart && <Cart onClose={cartCloser} />}
      <Header onShow={cartOpener} />
      <Meals />
    </CartProvider>
  );
}

export default App;
