import styles from '../css/Navbar.module.css'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={`${styles.navlink} ${styles.navLogoWrapper}`}>
        <p className={styles.navLogo}>ProgramEtt</p>
        {/* <div className={styles.radioIconWrapper}> */}
          <img className={styles.radioIcon} src="./assets/icons/radio-icon-2.svg" alt="radio icon"/>
        {/* </div> */}
      </NavLink>
      <div className={styles.linkWrapper}>
        <NavLink to="/">Något annat</NavLink>
        <NavLink to="/">Något annat</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;