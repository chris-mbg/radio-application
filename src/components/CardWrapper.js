import { useContext, useEffect } from 'react';
import { RadioContext } from '../contexts/RadioContext';
import styles from '../css/CardWrapper.module.css'
import ChannelCard from './ChannelCard';

const CardWrapper = () => {

  const { allChannels } = useContext(RadioContext);

  useEffect(()=> console.log(allChannels), [allChannels]);

  const renderChannelCards = () => {
    return (
      <div className={styles.cardWrapper}>
        {allChannels.map(channel => <ChannelCard channel={channel} key={channel.id} />)}
      </div>
    )
  }

  return (
    <div className={styles.componentContainer}>
      <h2>Här är korten</h2>
      { allChannels ? renderChannelCards() : null }
    </div>
  );
}

export default CardWrapper;