import { useContext, useEffect } from "react";
import { FavouriteContext } from "../contexts/FavouriteContext";
import styles from '../css/UserFavourites.module.css';

const UserFavourites = () => {

  const { userFavourites } = useContext(FavouriteContext);

  useEffect(()=> console.log('favoriter', userFavourites), [userFavourites]);

  return (
    <div className={styles.userFavContainer}>
      {userFavourites ?
        <div>
          <h2>Favoritkanaler</h2>
          {userFavourites.channels.map(channel => <p key={channel.channelId}>{channel.channelName}</p>)}
          <h2>Favoritprogram</h2>
          {userFavourites.programs.map(prog => <p key={prog.programId}>{prog.programName}</p>)}
          <h2>Favoritavsnitt</h2>
          {userFavourites.episodes.map(epi => <p key={epi.episodeId}>{epi.episodeTitle}</p>)}
        </div> : null }
    </div>
  );
}

export default UserFavourites;