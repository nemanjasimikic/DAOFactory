import { Link } from 'react-router-dom'
import styles from './styles.module.sass'
import daoCardLogo from 'static/svg/daoCardLogo.svg'
import settings from 'static/svg/settings.svg'
import linkIcon from 'static/svg/linkIcon.svg'

const DaoCard = ({ daoName, description, link, id }) => {
  const linkTo = link.split('/')
  return (
    <Link className={styles.daoCardLink} to={`dao/${linkTo[2]}`}>
      <div className={styles.daoCard}>
        <div className={styles.daoCardTopRow}>
          <div className={styles.daoInfoWrapper}>
            <img src={daoCardLogo} alt={'dao card logo'} />
            <div className={styles.daoInfoColumn}>
              <h3>{daoName}</h3>
              <p className={styles.description} title={description}>
                {description}
              </p>
            </div>
          </div>
          <Link
            to={`/dao-settings/general/${linkTo[2]}`}
            className={styles.settings}
          >
            <img src={settings} alt={'settings'} />
            <p>Settings</p>
          </Link>
        </div>
        <div className={styles.daoCardBottomRow}>
          <a
            href={`http://${link}`}
            target="_blank"
            title={`http://${link}`}
            className={styles.link}
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            http://{link}
          </a>
          <img src={linkIcon} alt={'link icon'} />
          <a href="#" target="_blank" className={styles.buyDomain}>
            Buy domain
          </a>
        </div>
      </div>
    </Link>
  )
}

export default DaoCard
