import { useState } from 'react'
import styles from './styles.module.sass'
import hamburgerClosed from 'static/svg/hamburgerClosed.svg'

const HamburgerMenu = () => {
  const [open, setOpen] = useState(false)

  const toggle = () => {
    return setOpen(!open)
  }

  return (
    <img
      src={open ? hamburgerClosed : null}
      onClick={toggle}
      className={styles.hamburger}
      alt={'hamburgerMenu'}
    />
  )
}

export default HamburgerMenu
