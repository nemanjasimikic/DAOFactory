import { useEffect } from 'react'
import styles from './styles.module.sass'
import closeModal from 'static/svg/closeModal.svg'

const Modal = ({ title, children, open, setOpen }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  return (
    <div className={open ? styles.modalWrapper : styles.modalWrapperClosed}>
      <div className={styles.modal}>
        <div className={styles.modalHeading}>
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

export default Modal
