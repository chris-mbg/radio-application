import { useContext, useEffect, useState } from "react";
import { RadioContext } from "../contexts/RadioContext";
import styles from "../css/ChannelPage.module.css";

const ChannelPage = (props) => {
  const { channelId } = props.match.params;
  const { fetchSingleChannel, fetchChannelSchedule } = useContext(RadioContext);
  const [channelInfo, setChannelInfo] = useState(null);
  const [channelSchedule, setChannelSchedule] = useState(null);

  const fetchData = async (channelId, fetchMethod) => {
    const result = await fetchMethod(channelId);
    if(result.channeltype) {
      setChannelInfo(result)
    } else {
      setChannelSchedule(result)
    }
  };

  useEffect( () => {
    fetchData(channelId, fetchSingleChannel);
    fetchData(channelId, fetchChannelSchedule);
  }, []);

  useEffect( () => {
    console.log('Channel Tablå:', channelSchedule);
  }, [channelSchedule]);
  useEffect( () => {
    console.log('Channel Info:', channelInfo);
  }, [channelInfo]);

  const renderChannelContent = () => {
    return (
      <div>
        <h1>Kanal: {channelInfo.name}</h1>
        <p>{channelInfo.tagline}</p>
      </div>
      )
  }

  return (
    <div className={styles.channelPageContainer}>
      {channelInfo ? renderChannelContent() : <p>Loading...</p>}
    </div>
  );
};

export default ChannelPage;
