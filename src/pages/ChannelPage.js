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
    return result;
  };

  useEffect( () => {
    setChannelInfo(fetchData(channelId, fetchSingleChannel));
    setChannelSchedule(fetchData(channelId, fetchChannelSchedule));
  }, []);

  useEffect( () => {
    console.log('Channel Info:', channelInfo);
    console.log('Channel Tablå:', channelSchedule);
  }, [channelInfo, channelSchedule])

  return (
    <div className={styles.channelPageContainer}>
      <h1>Här kommer kanal-info!</h1>
    </div>
  );
};

export default ChannelPage;
