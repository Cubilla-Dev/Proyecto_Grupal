"use client";
import React, { useState } from "react";
import Dashboard from "../components/Dashboard";
import { createContext } from "react";
import AppContext from "./AppContext";
const Home = () => {
  const [stateContext, setStateContext] = useState(false);
  return (
    <>
      <AppContext.Provider value={{ stateContext, setStateContext }}>
        <div>
          <Dashboard />
        </div>
      </AppContext.Provider>
    </>
  );
};

export default Home;
