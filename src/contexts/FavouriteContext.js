import { createContext, useEffect, useState } from "react";

export const FavouriteContext = createContext();

const FavouriteContextProvider = (props) => {


  const values = {

  };

  return (
    <FavouriteContext.Provider value={values}>
      {props.children}
    </FavouriteContext.Provider>
  );
};

export default FavouriteContextProvider;
