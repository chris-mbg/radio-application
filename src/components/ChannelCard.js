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
      <p>{channel.name}</p>
      <p>{channel.tagline}</p>
    </div>
  );
}

export default ChannelCard;