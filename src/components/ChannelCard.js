import styles from '../css/ChannelCard.module.css'


const ChannelCard = ({channel}) => {
  return (
    <div className={styles.channelCard}>
      <div className={styles.imgContainer}>
        <img src={channel.image} />
      </div>
      <p>{channel.name}</p>
      <p>{channel.tagline}</p>
    </div>
  );
}

export default ChannelCard;