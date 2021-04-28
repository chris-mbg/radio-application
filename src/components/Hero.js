import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import styles from '../css/Hero.module.css';

const Hero = () => {
  const {userLoggedIn } = useContext(UserContext);

  return (
    <div className={styles.hero}>
      <div className={styles.heroText}>
        <h1>Din vän i etern!</h1>
      </div>
      {userLoggedIn ? null : <p className={styles.explain}>Logga in eller registera dig för att börja spara dina radiofavoriter</p>}
    </div>
  );
}

export default Hero;