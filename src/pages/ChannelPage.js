import { useContext, useEffect, useState } from "react";
import ChannelSchedule from "../components/ChannelSchedule";
import ProgramList from "../components/ProgramList";
import { FavouriteContext } from "../contexts/FavouriteContext";
import { RadioContext } from "../contexts/RadioContext";
import styles from "../css/ChannelPage.module.css";

const ChannelPage = (props) => {
  const { channelId } = props.match.params;
  const { fetchSingleChannel } = useContext(RadioContext);
  const { userFavourites, addUserFavourite, deleteUserFavourite } = useContext(FavouriteContext);
  const [channelInfo, setChannelInfo] = useState(null);

  console.log( props.match.params)
  const fetchData = async (channelId, fetchMethod) => {
    const result = await fetchMethod(channelId);
    setChannelInfo(result);
  };

  // eslint-disable-next-line
  useEffect( () => fetchData(channelId, fetchSingleChannel), []);
  useEffect(() => window.scrollTo(0, 0), []);

  useEffect( () => {
    console.log('Channel Info:', channelInfo);
  }, [channelInfo]);

  const handleHeartClick = () => {
    if(userFavourites) {
      const alreadyFav = userFavourites.channels.some(ch => ch.channelId ===  parseInt(channelId));
      console.log('want to add fav', alreadyFav);
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
        <h1>{channelInfo.name}
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
        {/* <p>{channelInfo.channeltype}</p> */}
        <p className={styles.tagline}>{channelInfo.tagline}</p>
        {/* <div className={styles.imgWrapper}>
          <img src={channelInfo.image} alt="channel logo"/>
        </div> */}
      </div>
      )
  }

  return (
    <div className={styles.channelPageContainer}>
      {channelInfo ? renderChannelContent() : <p>Loading...</p>}
      <div className={styles.pageCompContainer}>
        <ChannelSchedule channelId={channelId}/>
        <ProgramList channelId={channelId}/>
      </div>
    </div>
  );
};

export default ChannelPage;
