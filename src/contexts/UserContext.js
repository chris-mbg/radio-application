import { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const history = useHistory();
  const [userLoggedIn, setUserLoggedIn] = useState(null);

  const loggedInCheck = async () => {
    let result = await fetch("/api/v1/users/whoami");
    result = await result.json();
    if (result) {
      console.log("Someone is logged in", result);
      setUserLoggedIn({
        userEmail: result.email,
        userId: result.userId
      });
    }
  };

  useEffect(() => loggedInCheck(), []);

  const getUserById = async userId => {
    let result = await fetch(`/api/v1/users/${userLoggedIn.userId}`);
    
  }

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
      alert("Wrong email or password!");
    } else if (result.success) {
      loggedInCheck();
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
    if (result.success) {

    }

    /* let result = await fetch(`/api/v1/blogs/${postToEdit.blogId}`, {
      method: 'PUT',
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(postToEdit)
    });
    result = await result.json();
    await fetchAllBlogPosts();
    return result; */
  };

  const values = {
    userLoggedIn,
    logInUser,
    logoutUser,
    deleteUser,
    editUser,
  };

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
};

export default UserContextProvider;
