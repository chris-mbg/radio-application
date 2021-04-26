import { useContext, useState, useEffect } from "react";
import { RadioContext } from "../contexts/RadioContext";
import styles from "../css/ChannelSchedule.module.css";

const ChannelSchedule = ({channelId}) => {

  const [channelSchedule, setChannelSchedule] = useState(null);
  const [scheduleDate, setScheduleDate] = useState(null);
  const { fetchChannelSchedule } = useContext(RadioContext);

  const handleDateChange = e => {
    setScheduleDate(e.target.value);
  }

  const fetchData = async (channelId, date) => {
    const result = await fetchChannelSchedule(channelId, date);
    setChannelSchedule(result);
  };

  // eslint-disable-next-line
  useEffect(() => fetchData(channelId, scheduleDate), []);
  useEffect(() => fetchData(channelId, scheduleDate), [scheduleDate]);
  useEffect(() => console.log('kanaltablå', channelSchedule), [channelSchedule]);

  const renderSchedule = () => {
    return (
      <div className={styles.channelScheduleContainer}>
        <div className={styles.datePickWrapper}>
          <label>Ändra datum?</label>
          <br />
          <input type="date" onChange={handleDateChange}/>
        </div>
        <h2>Tablå för {channelSchedule[0].starttimeutc.substring(0,10)}</h2>
        {channelSchedule.map(prog => (
          prog.program.name ? (
            <div key={prog.starttimeutc} className={styles.programContainer}>
              <p>Kl {prog.starttimeutc.substring(11,16)} {prog.program.name} - <span className={styles.desc}>{prog.description}</span>
              </p>

            </div>) : null
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