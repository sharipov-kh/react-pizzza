import { createContext } from "react";
import {  useState } from "react";

export const Appcontext = createContext();

export const AppcontextProvider = ({ children }) => {
  // Search components
  const [searchValue, setSearchValue] = useState("");

  const value = {
    searchValue,
    setSearchValue,
  };

  return <Appcontext.Provider value={value}>{children}</Appcontext.Provider>;
};
