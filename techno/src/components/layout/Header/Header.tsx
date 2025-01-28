import "../../../styles/globals.scss";
import styles from "./Header.module.scss";
import { HeaderUpper } from "./HeaderUpper/HeaderUpper";
import { HeaderLower } from "./HeaderLower/HeaderLower";
import { HeaderMobile } from "./HeaderMobile/HeaderMobile";

export const Header = () => {
  return (
    <header className={styles.header}>
      <section className={`${styles.headerWrapper} container`}>
        <HeaderUpper />
        <HeaderLower />
      </section>
      <section className={`${styles.mobileWrapper} container`}>
        <HeaderMobile />
      </section>
    </header>
  );
};
