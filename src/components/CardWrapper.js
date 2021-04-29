import { useContext, useState } from 'react';
import { RadioContext } from '../contexts/RadioContext';
import styles from '../css/CardWrapper.module.css'
import ChannelCard from './ChannelCard';

const CardWrapper = () => {

  const { allChannels } = useContext(RadioContext);
  const [showAllChannels, setShowAllChannels] = useState(false);

  const renderShortChannelCards = () => {
    const fewChannels = allChannels.slice(0,8);
    return (
      <div className={styles.cardWrapper}>
        {fewChannels.map(channel => <ChannelCard channel={channel} key={channel.id} />)}
      </div>
    )
  }
  const renderAllChannelCards = () => {
    return (
      <div className={styles.cardWrapper}>
        {allChannels.map(channel => <ChannelCard channel={channel} key={channel.id} />)}
      </div>
    )
  }
  const toggleChannels = () => setShowAllChannels(prevState => !prevState);

  return (
    <div className={styles.componentContainer}>
      <div className={styles.buttonContainer}>
        <button className={styles.expandButton} onClick={toggleChannels}>
          { showAllChannels ? "Visa färre" : "Visa alla kanaler"}
        </button>
      </div>
      <h2>{ showAllChannels ? "Bläddra bland alla kanaler" : "Populära kanaler" }</h2>
      { allChannels ? ( showAllChannels ? renderAllChannelCards() : renderShortChannelCards()) : null }
    </div>
  );
}

export default CardWrapper;