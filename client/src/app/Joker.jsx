"use client";
import React, { useState } from "react";
import { createContext } from "react";
import AppContext from "./AppContext";
const Joker = ({children}) => {
  const [stateContext, setStateContext] = useState(false);
  return (
    <>
      <AppContext.Provider value={{ stateContext, setStateContext }}>
        {children}
      </AppContext.Provider>
    </>
  );
};

export default Joker;
