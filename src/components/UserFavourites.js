import { useContext, useEffect } from "react";
import { FavouriteContext } from "../contexts/FavouriteContext";
import styles from "../css/UserFavourites.module.css";

const UserFavourites = () => {
  const { userFavourites } = useContext(FavouriteContext);

  useEffect(() => console.log("favoriter", userFavourites), [userFavourites]);

  return (
    <div className={styles.userFavContainer}>
      {userFavourites ? (
        <div>
          <h2>Dina favoriter</h2>
          {userFavourites.channels.length === 0 &&
          userFavourites.channels.length === 0 &&
          userFavourites.channels.length === 0 ? (
            <p>Inga favoriter än..</p>
          ) : (
            <div>
              <h3>Favoritkanaler</h3>
              {userFavourites.channels.map((channel) => (
                <p key={channel.channelId}>{channel.channelName}</p>
              ))}
              <h3>Favoritprogram</h3>
              {userFavourites.programs.map((prog) => (
                <p key={prog.programId}>{prog.programName}</p>
              ))}
              <h3>Favoritavsnitt</h3>
              {userFavourites.episodes.map((epi) => (
                <p key={epi.episodeId}>{epi.episodeTitle}</p>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default UserFavourites;
