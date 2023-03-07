import { useNavigate } from 'react-router-dom'
import Popup from 'components/Popup'
import Button from 'components/common/Button'
import styles from './styles.module.sass'

const NotificationPopup = ({ title, open, setOpen }) => {
  const navigate = useNavigate()
  let title1 = title ? title : 'Changes are saved'
  return (
    <Popup title={title1} open={open} setOpen={setOpen}>
      <div className={styles.buttonRow}>
        <Button
          style={'lightBlueBtn'}
          text={'OK'}
          onClick={() => {
            setOpen(!open)
            navigate('/')
          }}
        />
      </div>
    </Popup>
  )
}

export default NotificationPopup
