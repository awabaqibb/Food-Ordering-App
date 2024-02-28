import React, { createContext, useState } from "react";

const UserProgressContext = createContext({
  progress: "",
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export const UserProgressContextProvider = ({ children }) => {
  const [userProgress, setUserProgress] = useState("");
  const showCart = (second) => {
    setUserProgress("cart");
  };
  const hideCart = (second) => {
    setUserProgress("");
  };
  const showCheckout = (second) => {
    setUserProgress("checkout");
  };
  const hideCheckout = (second) => {
    setUserProgress("");
  };

  const userProgressCtx = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
  };

  return (
    <UserProgressContext.Provider value={userProgressCtx}>
      {children}
    </UserProgressContext.Provider>
  );
};

export default UserProgressContext;
