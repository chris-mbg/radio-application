import { createContext, useState } from "react";
import { useHistory } from "react-router-dom";

export const UserContext = createContext();

const UserContextProvider = props => {
  const history = useHistory();
  const [userLoggedIn, setUserLoggedIn] = useState(null);

  const loggedInCheck = async () => {
    let result = await fetch("/api/v1/users/whoami");
    result = await result.json();
    if (result) {
      console.log('Someone is logged in', result)
      setUserLoggedIn({userName: result.email, userId: result.userId});
    }
  };

  const logInUser = async userInput => {
    let result = await fetch("/api/v1/users/login", {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(userInput)
    });
    result = await result.json();
    if (result.error) {
      alert('Wrong email or password!');
    } else if(result.success) {
      loggedInCheck();
    }
  };

  const logoutUser = async () => {
    let result = await fetch("/api/v1/users/logout");
    result = await result.json();
    if (result.success) {
      console.log('User logged out');
      setUserLoggedIn(null);
      history.push("/");
    }
  };

  const values = {
    userLoggedIn,
    logInUser,
    logoutUser,
  }

  return (
    <UserContext.Provider value={values}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;