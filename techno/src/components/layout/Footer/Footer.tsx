import styles from './Footer.module.scss'
import "../../../styles/globals.scss";
import { FooterLower } from './FooterLower/FooterLower';
import { FooterUpper } from './FooterUpper/FooterUpper';


export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.footerWrapper} container`}>
        <FooterUpper />
        <FooterLower />
      </div>
    </footer>
  )
}