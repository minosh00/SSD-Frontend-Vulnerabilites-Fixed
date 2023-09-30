import React, { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';
import StripeCheckout from 'react-stripe-checkout';



const prodBaseUrl = 'http://localhost:5000/orders';

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [httpError, setHttpError] = useState(null);

  const cartCtx = useContext(CartContext);

  const totalAmount = `Rs${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(prodBaseUrl + '/orders', {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(
          `Something went wrong! Status code: ${response.status}`
        );
      }
    } catch (error) {
      setHttpError(error.message);
    }
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };


  async function handleToken(token) {
    console.log(token);
  }


  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <StripeCheckout
        stripeKey="pk_test_51Lr1EmF53OEZBtIfnDtu50k4oS98pyE6AfE0grktJfgVawhf7fEMAIbuSnQLCjXTDqC9PHNoJa2JkuJuZUeCI26300PQrA3w3S"
        token={handleToken}
        currency='LKR'>


<button class="btn btn-outline-danger" >
          pay now 
        </button>


      </StripeCheckout>

      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && !httpError && didSubmitModalContent}
      {!isSubmitting && httpError && <p>{httpError}</p>}
    </Modal>
  );
};

export default Cart;
