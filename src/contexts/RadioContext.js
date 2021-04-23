import { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const RadioContext = createContext();

const RadioContextProvider = (props) => {
  const history = useHistory();




  const values = {

  };

  return (
    <RadioContext.Provider value={values}>
      {props.children}
    </RadioContext.Provider>
  );
};

export default RadioContextProvider;
