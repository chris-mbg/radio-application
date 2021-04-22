import styles from "../css/Footer.module.css"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.footerLogo}>&copy; Program<span>Ett</span></p>
    </footer>
  );
}

export default Footer;