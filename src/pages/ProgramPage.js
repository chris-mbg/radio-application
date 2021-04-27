import { useContext, useEffect, useState } from "react";
import { FavouriteContext } from "../contexts/FavouriteContext";
import { RadioContext } from "../contexts/RadioContext";
import styles from "../css/ProgramPage.module.css";

const ProgramPage = (props) => {
  const { programId } = props.match.params;
  const {
    fetchProgramInfo,
    fetchProgramSchedule,
    fetchAllEpisodesForProgram,
  } = useContext(RadioContext);
  const { userFavourites, addUserFavourite, deleteUserFavourite } = useContext(
    FavouriteContext
  );
  const [programInfo, setProgramInfo] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let result = await fetchProgramInfo(programId);
      console.log(result);
      setProgramInfo(result);
    }
    fetchData();
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
        {/* <div className="favouriteIconWrapper">
          {userFavourites ?
            (userFavourites.programs.some(p => p.programId === parseInt(programId)) ?
              (<i onClick={handleHeartClick} className={`fas fa-heart fa-3x likeIcon`}></i>)
              :
              (<i onClick={handleHeartClick} className={`far fa-heart fa-3x likeIcon`}></i>))
            : null
          }
        </div> */}
        <h1>
          {programInfo.name}
          <span className="favouriteIconWrapper">
            {userFavourites ? (
              userFavourites.programs.some((p) => p.programId === parseInt(programId)) ? (
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
          </span>
        </h1>
        <p>{programInfo.channel.name}</p>
        <p>{programInfo.description}</p>
        <img src={programInfo.programimage} />
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
