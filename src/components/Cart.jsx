import React, { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";

const Cart = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const handleCloseCart = () => {
    userProgressCtx.hideCart();
  };

  const cartTotal = cartCtx.items.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);

  return (
    <Modal className="cart" open={userProgressCtx.progress === "cart"}>
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity}
          </li>
        ))}
      </ul>
      <p className="cart-total">{cartTotal}</p>
      <p className="modal-actions">
        <Button onClick={handleCloseCart} textOnly>
          Close
        </Button>
        <Button onClick={handleCloseCart}>Go To Checkout</Button>
      </p>
    </Modal>
  );
};

export default Cart;
