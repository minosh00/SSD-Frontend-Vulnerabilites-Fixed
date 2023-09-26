import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import './HeaderCartButton.css';

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false); // controls whether or not the button should be animated

  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `button ${btnIsHighlighted ? 'bump' : ''}`;
  const { items } = cartCtx;

  // using the useEffect hook for adding animation on HeaderCartButton whenever the amount of items in the cart changes
  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    // removing the animation class (bump) after animation finishes
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    // clean-up function
    return () => {
      clearTimeout(timer);
    };
  }, [items, cartCtx.items.length]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className='icon'>
        <CartIcon />
      </span>
      <span className='text'>Your Cart</span>
      <span className='badge'>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
