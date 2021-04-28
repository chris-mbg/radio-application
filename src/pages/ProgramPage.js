import { useContext, useEffect, useRef, useState } from "react";
import { FavouriteContext } from "../contexts/FavouriteContext";
import { RadioContext } from "../contexts/RadioContext";
import styles from "../css/ProgramPage.module.css";

const ProgramPage = (props) => {
  const { programId } = props.match.params;
  const {
    fetchProgramInfo,
    fetchProgramSchedule,
    // fetchAllEpisodesForProgram,
  } = useContext(RadioContext);
  const { userFavourites, addUserFavourite, deleteUserFavourite } = useContext(
    FavouriteContext
  );
  const [programInfo, setProgramInfo] = useState(null);
  const [programSchedule, setProgramSchedule] = useState(null);

  const isMountedRef = useRef(null);

  const fetchData = async () => {
    console.log('From fetchdata progInfo', isMountedRef.current);
    if(isMountedRef.current) {
      let result = await fetchProgramInfo(programId);
      console.log(result);
      setProgramInfo(result);
    }
  };
  const fetchScheduleData = async () => {
    console.log('From fetchScheduledata', isMountedRef.current);
    if(isMountedRef.current) {
      let result = await fetchProgramSchedule(programId);
      // console.log(result);
      setProgramSchedule(result);
    }
  };

  useEffect(() => {
    isMountedRef.current = true;
    if(isMountedRef.current) {
      fetchData();
      fetchScheduleData();
    }

    return () => isMountedRef.current = false;
  }, []);

  useEffect(() => window.scrollTo(0, 0), []);

  const handleHeartClick = () => {
    if (userFavourites) {
      const alreadyFav = userFavourites.programs.some(
        (p) => p.programId === parseInt(programId)
      );
      console.log("want to add fav", alreadyFav);
      alreadyFav
        ? deleteUserFavourite({ programId: programInfo.id })
        : addUserFavourite({
            programId: programInfo.id,
            programName: programInfo.name,
          });
    } else {
      return;
    }
  };

  const renderProgramInfo = () => {
    return (
      <div>
        <div className="favouriteIconWrapper">
          {userFavourites ? (
            userFavourites.programs.some(
              (p) => p.programId === parseInt(programId)
            ) ? (
              <i
                onClick={handleHeartClick}
                className={`fas fa-heart fa-3x likeIcon`}
              ></i>
            ) : (
              <i
                onClick={handleHeartClick}
                className={`far fa-heart fa-3x likeIcon`}
              ></i>
            )
          ) : null}
        </div>
        <h1 className={styles.heading}>{programInfo.name}</h1>
        <div className={styles.contentContainer}>
          <div className={styles.textWrapper}>
            <p className={styles.desc}>{programInfo.description}</p>
            {programInfo.channel.name === "[No channel]" ? null : (
              <p className={styles.light}>
                Kanal:{" "}
                <span className={styles.broadcastTitle}>
                  {programInfo.channel.name}
                </span>
              </p>
            )}
            {programInfo.broadcastinfo !== "" && (
              <p className={styles.light}>
                Sänds:{" "}
                <span className={styles.broadcastTitle}>
                  {programInfo.broadcastinfo}
                </span>
              </p>
            )}
          </div>
          <div className={styles.imgWrapper}>
            <img src={programInfo.programimage} />
          </div>
        </div>
        {programSchedule && programSchedule.broadcasts.length > 0 ? (
          <div>
            <h2>Senast sända program</h2>
            {programSchedule.broadcasts.length > 20
              ? programSchedule.broadcasts.slice(0, 20).map((episode) => (
                  <p key={episode.id} className={styles.broadcast}>
                    {episode.broadcastdateutc}{" "}
                    <span className={styles.broadcastTitle}>
                      {episode.title.substring(0, episode.title.length - 14)}
                    </span>
                  </p>
                ))
              : programSchedule.broadcasts.map((episode) => (
                  <p key={episode.id} className={styles.broadcast}>
                    {episode.broadcastdateutc}{" "}
                    <span className={styles.broadcastTitle}>
                      {episode.title.substring(0, episode.title.length - 14)}
                    </span>
                  </p>
                ))}
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div className={styles.programPageContainer}>
      {programInfo ? renderProgramInfo() : null}
    </div>
  );
};

export default ProgramPage;
