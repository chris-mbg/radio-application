import { useContext, useEffect, useState } from "react";
import ChannelSchedule from "../components/ChannelSchedule";
import ProgramList from "../components/ProgramList";
import { RadioContext } from "../contexts/RadioContext";
import styles from "../css/ChannelPage.module.css";

const ChannelPage = (props) => {
  const { channelId } = props.match.params;
  const { fetchSingleChannel } = useContext(RadioContext);
  const [channelInfo, setChannelInfo] = useState(null);


  const fetchData = async (channelId, fetchMethod) => {
    const result = await fetchMethod(channelId);
    setChannelInfo(result);
  };

  // eslint-disable-next-line
  useEffect( () => fetchData(channelId, fetchSingleChannel), []);

  useEffect( () => {
    console.log('Channel Info:', channelInfo);
  }, [channelInfo]);

  const renderChannelContent = () => {
    return (
      <div>
        <h1>{channelInfo.name}</h1>
        <button>Favoritmarkera kanal</button>
        <p>{channelInfo.channeltype}</p>
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
