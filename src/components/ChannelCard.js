import { useHistory } from 'react-router-dom';
import styles from '../css/ChannelCard.module.css'


const ChannelCard = ({channel}) => {

  const history = useHistory();

  const handleCardClick = channelId => {
    if (channel.channeltype === "Extrakanaler") {
      return
    } else {
      history.push(`/channel/${channelId}`);
    }
  };

  return (
    <div className={`${styles.channelCard} ${channel.channeltype === "Extrakanaler" ? styles.disable : ""}`} onClick={()=> handleCardClick(channel.id)}>
      <div className={styles.imgContainer}>
        <img src={channel.image} alt="" />
      </div>
      <div className={styles.contentContainer}>
        <p className={styles.channelName}>{channel.name}</p>
        <p className={styles.type}>{channel.channeltype}</p>
      </div>
    </div>
  );
}

export default ChannelCard;

// className={`${styles.tab}  ${
//  scheduleToShow === channel.channelId ? styles.active : ""
//}`}