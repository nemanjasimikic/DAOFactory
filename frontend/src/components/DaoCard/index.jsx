import { Link } from 'react-router-dom'
import styles from './styles.module.sass'
import daoCardLogo from 'static/svg/daoCardLogo.svg'
import settings from 'static/svg/settings.svg'
import linkIcon from 'static/svg/linkIcon.svg'

const DaoCard = ({ daoName, description, link }) => {
  return (
    <Link className={styles.daoCardLink} to={'/balance'}>
      <div className={styles.daoCard}>
        <div className={styles.daoCardTopRow}>
          <div className={styles.daoInfoWrapper}>
            <img src={daoCardLogo} alt={'dao card logo'} />
            <div className={styles.daoInfoColumn}>
              <h3>{daoName}</h3>
              <p>{description}</p>
            </div>
          </div>
          <Link to={'/dao-settings/general'} className={styles.settings}>
            <img src={settings} alt={'settings'} />
            <p>Settings</p>
          </Link>
        </div>
        <div className={styles.daoCardBottomRow}>
          <a
            href="https://daobuilder.io/productname"
            target="_blank"
            className={styles.link}
          >
            http://{link}
          </a>
          <img src={linkIcon} alt={'link icon'} />
          <p className={styles.buyDomain}>Buy domain</p>
        </div>
      </div>
    </Link>
  )
}

export default DaoCard
