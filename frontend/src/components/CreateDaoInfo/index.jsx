import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.sass'

const CreateDaoInfo = ({ page }) => {
  const wallet = useSelector((state) => state.wallet)
  const navigate = useNavigate()

  useEffect(() => {
    if (wallet.wallet === null) {
      navigate('/')
    }
  }, [wallet, navigate])
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.section}>
          <h3>DAO name</h3>
          <p className={styles.link}>https://daobuilder.io/productname</p>
        </div>
        <div className={styles.section}>
          <div className={styles.sectionRow}>
            <p className={styles.name}>Governance token</p>
            <p className={styles.value}>LOL</p>
          </div>
          <div className={styles.sectionRow}>
            <p className={styles.name}>
              Required amount for creating <br /> a proposal
            </p>
            <p className={styles.value}>100000000 LOL</p>
          </div>
        </div>
        {page > 0 && (
          <div className={styles.section}>
            <div className={styles.sectionRow}>
              <p className={styles.name}>Quorum</p>
              <p className={styles.value}>51%</p>
            </div>
            <div className={styles.sectionRow}>
              <p className={styles.name}>Threshold</p>
              <p className={styles.value}>0 LOL</p>
            </div>
          </div>
        )}
        {page > 1 && (
          <div className={styles.section}>
            <div className={styles.sectionRow}>
              <p className={styles.name}>Proposal duration</p>
              <p className={styles.value}>10 days 12 hours</p>
            </div>
            <div className={styles.graphic}>
              <div className={styles.time}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CreateDaoInfo
