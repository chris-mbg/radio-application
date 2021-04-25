import { useContext, useState, useEffect } from "react";
import { RadioContext } from "../contexts/RadioContext";
import styles from "../css/ChannelSchedule.module.css";

const ChannelSchedule = ({channelId}) => {

  const [channelSchedule, setChannelSchedule] = useState(null);
  const { fetchChannelSchedule } = useContext(RadioContext);

  const fetchData = async (channelId) => {
    const result = await fetchChannelSchedule(channelId);
    setChannelSchedule(result);
  };

  useEffect(() => fetchData(channelId), []);
  useEffect(() => console.log('kanaltablå', channelSchedule), [channelSchedule]);

  const renderSchedule = () => {
    return (
      <div>
        <h2>Tablå för {channelSchedule[0].starttimeutc.substr(0,10)}</h2>
        {channelSchedule.map(prog => (
          <div key={prog.starttimeutc}>
            <p>Kl {prog.starttimeutc.substr(11,15)} {prog.program.name}</p>
            <p>{prog.description}</p>
            <hr />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={styles.channelScheduleContainer}>
      {channelSchedule ? renderSchedule() : null }
    </div>
  );
}

export default ChannelSchedule;