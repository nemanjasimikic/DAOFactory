import styles from './styles.module.sass'
import closeModal from 'static/svg/closeModal.svg'

const Popup = ({ title, children, open, setOpen }) => {
  return (
    <div className={open ? styles.popupWrapper : styles.popupWrapperClosed}>
      <div className={styles.popup}>
        <div className={styles.popupHeading}>
          <p>{title}</p>
          <img
            src={closeModal}
            alt={'close modal'}
            onClick={() => setOpen(!open)}
          />
        </div>
        {children}
      </div>
    </div>
  )
}

export default Popup
