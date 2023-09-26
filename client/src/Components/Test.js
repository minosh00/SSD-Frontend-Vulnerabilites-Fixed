import { useState } from 'react';
import Cart from './Cart/Cart';
import Header from './Layout/Header';
import Meals from './Meals/Meals';
import CartProvider from '../store/CartProvider';
import NavBar from "./Layouts/NavBar";
const  Test=()=> {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    
    <div>
        <NavBar />
        
    <CartProvider>
    
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main id="main-content">
        <Meals></Meals>
      </main>
    </CartProvider>

   
    </div>
 
  );
}

export default Test;