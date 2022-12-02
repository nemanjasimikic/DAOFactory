import { Link } from 'react-router-dom'
import LogoImage from 'static/svg/logo.svg'
import styles from './styles.module.sass'

const Logo = () => {
  return (
    <Link to="/">
      <img className={styles.logo} src={LogoImage} alt={'logo'} />
    </Link>
  )
}

export default Logo
