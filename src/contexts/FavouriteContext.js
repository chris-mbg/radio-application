import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const FavouriteContext = createContext();

const FavouriteContextProvider = (props) => {

  const { userLoggedIn } = useContext(UserContext);
  const [userFavourites, setUserFavourites] = useState(null);

  const getAllUserFavourites = async () => {
    if(userLoggedIn) {
      let favoritesList = await fetch(`/api/v1/users/favourites`);
      favoritesList = await favoritesList.json();
      setUserFavourites(favoritesList);
    }
  };

  const addUserFavourite = async favouriteInfo => {
      let result = await fetch("/api/v1/users/favourites", {
        method: "POST",
        headers: {
        "content-type": "application/json",
        },
        body: JSON.stringify(favouriteInfo),
      });
      result = await result.json();
      return result;
  };


  useEffect(() => getAllUserFavourites(), [userLoggedIn]);

  const values = {
    userFavourites,
    addUserFavourite
  };

  return (
    <FavouriteContext.Provider value={values}>
      {props.children}
    </FavouriteContext.Provider>
  );
};

export default FavouriteContextProvider;
