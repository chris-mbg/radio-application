import { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const history = useHistory();
  const [userLoggedIn, setUserLoggedIn] = useState(null);

  const loggedInCheck = async () => {
    let result = await fetch("/api/v1/users/whoami");
    result = await result.json();
    console.log('In loggedincheck', result);
    if (result) {
      console.log("Someone is logged in", result);
      setUserLoggedIn({
        userEmail: result.email,
        userId: result.userId,
        userFirstName: result.firstName,
        userLastName: result.lastName
      });
    } else {
      setUserLoggedIn(null);
    }
  };

  useEffect(() => loggedInCheck(), []);

  const getUserById = async userId => {
    let result = await fetch(`/api/v1/users/${userId}`);
    result = await result.json();
    if(!result.error){
      return result
    }
  };

  const logInUser = async (userInput) => {
    let result = await fetch("/api/v1/users/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userInput),
    });
    result = await result.json();
    if (result.error) {
      return { error: "Wrong email or password!" };
    } else if (result.success) {
      loggedInCheck();
      return {};
    }
  };

  const logoutUser = async () => {
    let result = await fetch("/api/v1/users/logout");
    result = await result.json();
    if (result.success) {
      console.log("User logged out");
      setUserLoggedIn(null);
      history.push("/");
    }
  };

  const registerNewUser = async (newUserInput) => {
    let result = await fetch("/api/v1/users/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUserInput),
    });
    result = await result.json();
    console.log("User registered?", result);
    if (result.success) {
      loggedInCheck();
      history.push("/");
    }
    return result;
  };

  const deleteUser = async () => {
    let result = await fetch(`/api/v1/users/${userLoggedIn.userId}`, {
      method: "DELETE",
    });
    result = await result.json();
    if (result.success) {
      loggedInCheck();
      history.push("/");
    }
  };

  const editUser = async (userToEditInput) => {
    let result = await fetch(`/api/v1/users/${userLoggedIn.userId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userToEditInput),
    });
    result = await result.json();
    console.log('EditUser in UserContext', result);
    if (result.success) {
      //getUserById(userLoggedIn.userId)
      loggedInCheck();
      return result
    }
  };

  const values = {
    userLoggedIn,
    logInUser,
    logoutUser,
    registerNewUser,
    deleteUser,
    editUser,
    getUserById,
  };

  return (
    <UserContext.Provider value={values}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
