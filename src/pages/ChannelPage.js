import { useContext, useEffect, useState } from "react";
import ChannelSchedule from "../components/ChannelSchedule";
import ProgramList from "../components/ProgramList";
import { FavouriteContext } from "../contexts/FavouriteContext";
import { RadioContext } from "../contexts/RadioContext";
import styles from "../css/ChannelPage.module.css";
import useIsMountedRef from "../hooks/useIsMountedRef";

const ChannelPage = (props) => {
  const { channelId } = props.match.params;
  const { fetchSingleChannel } = useContext(RadioContext);
  const { userFavourites, addUserFavourite, deleteUserFavourite } = useContext(FavouriteContext);
  const [channelInfo, setChannelInfo] = useState(null);

  const isMounted = useIsMountedRef();

  const fetchData = async (channelId, fetchMethod) => {
    const result = await fetchMethod(channelId);
    if(isMounted.current) {
      setChannelInfo(result);
    }
  };

  useEffect( () => {
    if (isMounted.current) {
      fetchData(channelId, fetchSingleChannel)
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => window.scrollTo(0, 0), []);

  const handleHeartClick = () => {
    if(userFavourites) {
      const alreadyFav = userFavourites.channels.some(ch => ch.channelId ===  parseInt(channelId));
      if(!alreadyFav) {
        addUserFavourite({ channelId: channelInfo.id, channelName: channelInfo.name });
      } else {
        deleteUserFavourite({ channelId: channelInfo.id});
      }
    } else {
      return
    }
  };

  const renderChannelContent = () => {
    return (
      <div>
        <h1 className={styles.heading}>{channelInfo.name}
          <span className="favouriteIconWrapper">
            {userFavourites ?
              (userFavourites.channels.some(ch => ch.channelId === parseInt(channelId)) ?
                (<i onClick={handleHeartClick} className={`fas fa-heart fa-3x likeIcon`}></i>)
                :
                (<i onClick={handleHeartClick} className={`far fa-heart fa-3x likeIcon`}></i>))
              : null
            }
          </span>
        </h1>
        <p className={styles.tagline}>{channelInfo.tagline}</p>
      </div>
    )
  }

  return (
    <div className={styles.channelPageContainer}>
      {channelInfo ? renderChannelContent() : <p>Loading...</p>}
      <div className={styles.pageCompContainer}>
        <ProgramList channelId={channelId}/>
        <ChannelSchedule channelId={channelId}/>
      </div>
    </div>
  );
};

export default ChannelPage;
