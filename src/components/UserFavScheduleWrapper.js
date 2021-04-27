import { useContext, useEffect, useState } from "react";
import { FavouriteContext } from "../contexts/FavouriteContext";
import ChannelSchedule from "./ChannelSchedule";
import styles from "../css/UserFavScheduleWrapper.module.css";

const UserFavScheduleWrapper = () => {
  const { userFavourites } = useContext(FavouriteContext);
  const [scheduleToShow, setScheduleToShow] = useState(null);

  useEffect(() => setScheduleToShow(userFavourites.channels[0].channelId), [
    userFavourites,
  ]);

  const renderScheduleTabs = () => {
    return (
      <div className={styles.tabs}>
        {userFavourites.channels.map((channel) => (
        <p
          className={`${styles.tab}  ${
            scheduleToShow === channel.channelId ? styles.active : ""
          }`}
          onClick={() => setScheduleToShow(channel.channelId)}
        >
          {channel.channelName}
        </p>)
        )}
      </div>
    );
  };
  const renderSchedules = () => {
    const tempArray = userFavourites.channels.map((channel) => (
          scheduleToShow === channel.channelId && <div className={`${styles.channelScheduleContainer}`}><ChannelSchedule channelId={channel.channelId} /></div>
    ))
    return tempArray
  };

  return (
    <div className={styles.componentContainer}>
      <h3>Tablåer för dina kanaler</h3>
      <div className={styles.schedulesContainer}>
        {userFavourites && scheduleToShow ? renderScheduleTabs() : <div>Loading...</div>}
        {userFavourites && scheduleToShow ? renderSchedules() : <div>Loading...</div>}
      </div>
    </div>
  );
};
export default UserFavScheduleWrapper;