import { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = props => {

  const [userLoggedIn, setUserLoggedIn] = useState(null);

  const loggedInCheck = async () => {
    let result = await fetch("/api/v1/users/whoami");
    result = await result.json();
    if (result) {
      console.log('Someone is logged in', result)
      setUserLoggedIn({userName: result.email, userId: result.userId});
    }
  };

  const values = {
    userLoggedIn
  }

  return (
    <UserContext.Provider value={values}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;