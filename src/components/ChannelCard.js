import { useHistory } from 'react-router-dom';
import styles from '../css/ChannelCard.module.css'


const ChannelCard = ({channel}) => {

  const history = useHistory();

  const handleCardClick = channelId => history.push(`/channel/${channelId}`);

  return (
    <div className={styles.channelCard} onClick={()=> handleCardClick(channel.id)}>
      <div className={styles.imgContainer}>
        <img src={channel.image} />
      </div>
      <div className={styles.contentContainer}>
        <p className={styles.channelName}>{channel.name}</p>
        <p className={styles.type}>{channel.channeltype}</p>
      </div>
    </div>
  );
}

export default ChannelCard;