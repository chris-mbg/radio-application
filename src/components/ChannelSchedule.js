import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FavouriteContext } from "../contexts/FavouriteContext";
import { RadioContext } from "../contexts/RadioContext";
import styles from "../css/ChannelSchedule.module.css";

const ChannelSchedule = ({channelId}) => {
  const history = useHistory();
  const [channelSchedule, setChannelSchedule] = useState(null);
  const [scheduleDate, setScheduleDate] = useState(null);
  const { fetchChannelSchedule } = useContext(RadioContext);
  const { userFavourites, addUserFavourite, deleteUserFavourite } = useContext(FavouriteContext);

  const handleDateChange = e => {
    setScheduleDate(e.target.value);
  }

  const fetchData = async (channelId, date) => {
    const result = await fetchChannelSchedule(channelId, date);
    setChannelSchedule(result);
  };

  // eslint-disable-next-line
  useEffect(() => fetchData(channelId, scheduleDate), []);
  // eslint-disable-next-line
  useEffect(() => fetchData(channelId, scheduleDate), [scheduleDate]);
  //useEffect(() => console.log('kanaltablå', channelSchedule), [channelSchedule]);

  const handleHeartClick = (episodeId, episodeTitle) => {
    if(userFavourites) {
      const alreadyFav = userFavourites.episodes.some(epi => epi.episodeId ===  parseInt(episodeId));
      console.log('want to add fav', alreadyFav);
      if(!alreadyFav) {
        addUserFavourite({ episodeId: episodeId, episodeTitle: episodeTitle });
      } else {
        deleteUserFavourite({ episodeId: episodeId});
      }
    } else {
      return
    }
  };

  const renderSchedule = () => {
    return (
      <div className={styles.channelScheduleContainer}>
        <h2>Tablå för {channelSchedule[0].starttimeutc.substring(0,10)}</h2>
        <div className={styles.datePickWrapper}>
          <label>Ändra datum?</label>
          <br />
          <input type="date" onChange={handleDateChange}/>
        </div>
        {channelSchedule.map(prog => (
          prog.program.name ? (
            <div key={prog.starttimeutc} className={styles.programContainer}>
              <p>Kl {prog.starttimeutc.substring(11,16)}
                <span onClick={() => history.push(`/program/${prog.program.id}`)} className={styles.programName}> {prog.program.name} - </span>
                <span className={styles.desc}>{prog.description}</span>
              </p>
              <div className={styles.favouriteIconWrapper}>
                {userFavourites ?
                  (userFavourites.episodes.some(epi => epi.episodeId === parseInt(prog.episodeid)) ?
                    (<i onClick={() => handleHeartClick(prog.episodeid, prog.title)} className={`fas fa-heart likeIcon`}></i>)
                    :
                    (<i onClick={() => handleHeartClick(prog.episodeid, prog.title)} className={`far fa-heart likeIcon`}></i>))
                : null
                }
              </div>
            </div>
          ) : null
        ))}
      </div>
    )
  }

  return (
    <div className={styles.compContainer}>
      {channelSchedule ? renderSchedule() : null }
    </div>
  );
}

export default ChannelSchedule;