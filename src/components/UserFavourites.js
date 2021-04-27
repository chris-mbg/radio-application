import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FavouriteContext } from "../contexts/FavouriteContext";
import styles from "../css/UserFavourites.module.css";

const UserFavourites = () => {
  const history = useHistory();
  const { userFavourites } = useContext(FavouriteContext);

  useEffect(() => console.log("favoriter", userFavourites), [userFavourites]);

  const renderUserFav = () => {
    return (
      <div>
          <h2>Dina favoriter</h2>
          {userFavourites.channels.length === 0 &&
          userFavourites.programs.length === 0 ? (
            <p>Inga favoriter än..</p>
          ) : (
            <div>
              <h3>Kanaler</h3>
              {userFavourites.channels.map((channel) => (
                <p
                  key={channel.channelId}
                  onClick={() => history.push(`/channel/${channel.channelId}`)}
                >
                  {channel.channelName}
                </p>
              ))}
              <h3>Program</h3>
              {userFavourites.programs.map((prog) => (
                <p
                  key={prog.programId}
                  onClick={() => history.push(`/program/${prog.programId}`)}
                >
                  {prog.programName}{" "}
                </p>
              ))}
            </div>
          )}
        </div>
    )
  }

  return (
    <div className={styles.userFavContainer}>
      {userFavourites ? renderUserFav() : null}
    </div>
  );
};

export default UserFavourites;
