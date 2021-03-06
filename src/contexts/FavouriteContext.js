import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const FavouriteContext = createContext();

const FavouriteContextProvider = (props) => {

  const { userLoggedIn } = useContext(UserContext);
  const [userFavourites, setUserFavourites] = useState(null);

  const getAllUserFavourites = async () => {
    if(userLoggedIn) {
      let favoritesList = await fetch(`/api/v1/favourites`);
      favoritesList = await favoritesList.json();
      setUserFavourites(favoritesList);
    }
  };

  const addUserFavourite = async favouriteInfo => {
      let result = await fetch("/api/v1/favourites", {
        method: "POST",
        headers: {
        "content-type": "application/json",
        },
        body: JSON.stringify(favouriteInfo),
      });
      result = await result.json();
      if (result.success) {
        getAllUserFavourites();
      }
      return result;
  };

  const deleteUserFavourite = async favouriteId => {
    let result = await fetch("/api/v1/favourites", {
      method: "DELETE",
      headers: {
      "content-type": "application/json",
      },
      body: JSON.stringify(favouriteId)
    });
    result = await result.json();
    if(result.success) {
      getAllUserFavourites();
    }
  }

  useEffect(() => {
    if(userLoggedIn) getAllUserFavourites();
    // eslint-disable-next-line
  }, [userLoggedIn]);

  const values = {
    userFavourites,
    addUserFavourite,
    deleteUserFavourite
  };

  return (
    <FavouriteContext.Provider value={values}>
      {props.children}
    </FavouriteContext.Provider>
  );
};

export default FavouriteContextProvider;
