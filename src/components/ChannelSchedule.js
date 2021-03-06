import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FavouriteContext } from "../contexts/FavouriteContext";
import { RadioContext } from "../contexts/RadioContext";
import styles from "../css/ChannelSchedule.module.css";
import useIsMountedRef from "../hooks/useIsMountedRef";

const ChannelSchedule = ({channelId}) => {
  const history = useHistory();
  const [channelSchedule, setChannelSchedule] = useState(null);
  const [scheduleDate, setScheduleDate] = useState(null);
  const { fetchChannelSchedule } = useContext(RadioContext);
  const { userFavourites, addUserFavourite, deleteUserFavourite } = useContext(FavouriteContext);

  const isMounted = useIsMountedRef();

  const handleDateChange = e => {
    setScheduleDate(e.target.value);
  }

  const fetchData = async (channelId, date) => {
    const result = await fetchChannelSchedule(channelId, date);
    if(isMounted.current) {
      setChannelSchedule(result);
    }
  };

  // eslint-disable-next-line
  useEffect(() => fetchData(channelId, scheduleDate), []);
  // eslint-disable-next-line
  useEffect(() => fetchData(channelId, scheduleDate), [scheduleDate]);

  const handleProgNameClick = (progId, channelId) => {
    if(progId !== channelId) {
      history.push(`/program/${progId}`);
    }
  }

  const handleHeartClick = (favInfo) => {
    if (userFavourites) {
      const alreadyFav = userFavourites.programs.some(prog => prog.programId ===  favInfo.programId);
      alreadyFav ? deleteUserFavourite({ programId: favInfo.programId}) : addUserFavourite(favInfo);
    } else {
      return
    }
  };

  const renderSchedule = () => {
    return (
      <div className={styles.channelScheduleContainer}>
        <h2>Tablå för {channelSchedule[0].channel.name} {channelSchedule[0].starttimeutc.substring(0,10)}</h2>
        <div className={styles.datePickWrapper}>
          <label>Ändra datum?</label>
          <br />
          <input type="date" onChange={handleDateChange}/>
        </div>
        <div className={styles.allProgContainer}>
        {channelSchedule.map(prog => (
          prog.program.name ? (
            <div key={prog.starttimeutc} className={styles.programContainer}>
              <p>Kl {prog.starttimeutc.substring(11,16)}
                <span onClick={() => handleProgNameClick(prog.program.id, prog.channel.id)} className={styles.programName}>  {prog.program.name}  </span>
                <span className={`${styles.desc} ${styles.hideMobile}`}>- {prog.description}</span>
              </p>
              <div className={styles.favouriteIconWrapper}>
                {userFavourites && prog.program.id !== prog.channel.id ?
                  (userFavourites.programs.some(favProg => favProg.programId ===  prog.program.id) ?
                    (<i onClick={() => handleHeartClick({programId: prog.program.id, programName: prog.program.name})} className={`fas fa-heart likeIcon`}></i>)
                    :
                    (<i onClick={() => handleHeartClick({programId: prog.program.id, programName: prog.program.name})} className={`far fa-heart likeIcon`}></i>)
                  )
                : null
                }
              </div>
            </div>
          ) : null
        ))}
        </div>
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