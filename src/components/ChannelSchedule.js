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
  useEffect(() => console.log('kanaltablå', channelSchedule), [channelSchedule]);

  const handleHeartClick = (favInfo) => {
    if(userFavourites && favInfo.episodId) {
      const alreadyFav = userFavourites.episodes.some(epi => epi.episodeId ===  parseInt(favInfo.episodeId));
      console.log('want to add fav', alreadyFav);
      if(!alreadyFav) {
        addUserFavourite(favInfo);
      } else {
        deleteUserFavourite({ episodeId: favInfo.episodeId});
      }
    } else if (userFavourites && favInfo.programId){
      const alreadyFav = userFavourites.programs.some(prog => prog.episodeId ===  parseInt(favInfo.programId));
      console.log('want to add fav', alreadyFav);
      if(!alreadyFav) {
        addUserFavourite(favInfo);
      } else {
        deleteUserFavourite({ programId: favInfo.programId});
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
                {userFavourites && userFavourites.episodes.map(episode => (
                  prog.episodeid ?
                    (episode.episodeId === parseInt(prog.episodeid)) ?
                      (<i onClick={() => handleHeartClick({episodeId: prog.episodeid, episodeTitle: prog.title})} className={`fas fa-heart likeIcon`}></i>)
                    :
                      (<i onClick={() => handleHeartClick({episodeId: prog.episodeid, episodeTitle: prog.title})} className={`far fa-heart likeIcon`}></i>)
                  :
                    (userFavourites.programs.some(favProg => favProg.programId ===  parseInt(prog.program.id)) ?
                      (<i onClick={() => handleHeartClick({programId: prog.program.id, programName: prog.program.name})} className={`fas fa-heart likeIcon`}></i>)
                    :
                      (<i onClick={() => handleHeartClick({programId: prog.program.id, programName: prog.program.name})} className={`far fa-heart likeIcon`}></i>)
                    )
                ))
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