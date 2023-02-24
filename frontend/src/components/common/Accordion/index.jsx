import { useState } from 'react'
import styles from './styles.module.sass'
import accordionArrowBottom from 'static/svg/accordionArrowBottom.svg'
import accordionArrowTop from 'static/svg/accordionArrowTop.svg'

const Accordion = ({ title, content }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className={styles.accordion}>
      <div
        className={styles.accordionTopContainer}
        onClick={() => setOpen(!open)}
      >
        <p>{title}</p>
        <img
          src={open ? accordionArrowTop : accordionArrowBottom}
          alt={'accordion arrow'}
        />
      </div>
      <div
        className={
          open ? styles.accordionContent : styles.accordionContentHidden
        }
      >
        <div className={styles.row}>
          <p className={styles.info}>Type</p>
          <p className={styles.value}>Value</p>
        </div>
        <div className={styles.row}>
          <p className={styles.info}>Original network</p>
          <p className={styles.value}>Value</p>
        </div>
        <div className={styles.row}>
          <p className={styles.info}>Token contract address</p>
          <p className={styles.value}>Value</p>
        </div>
        <div className={styles.row}>
          <p className={styles.info}>Ticker</p>
          <p className={styles.value}>Value</p>
        </div>
        <div className={styles.row}>
          <p className={styles.info}>Token name</p>
          <p className={styles.value}>Value</p>
        </div>
        <div className={styles.row}>
          <p className={styles.info}>Decimal places</p>
          <p className={styles.value}>Value</p>
        </div>
      </div>
    </div>
  )
}

export default Accordion
