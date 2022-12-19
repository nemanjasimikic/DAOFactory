import Logo from 'components/Header/Logo'
import Navbar from 'components/Header/Navbar'
import hamburgerClosed from 'static/svg/hamburgerClosed.svg'

import styles from './styles.module.sass'

const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <Navbar />
      <img
        className={styles.hamburgerIcon}
        src={hamburgerClosed}
        alt={'hamburger menu'}
      />
    </header>
  )
}

export default Header
