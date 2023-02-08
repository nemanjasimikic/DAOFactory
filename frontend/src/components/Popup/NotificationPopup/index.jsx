import { useNavigate } from 'react-router-dom'
import Popup from 'components/Popup'
import Button from 'components/common/Button'
import styles from './styles.module.sass'

const NotificationPopup = ({ open, setOpen }) => {
  const navigate = useNavigate()
  return (
    <Popup title={'Changes are saved'} open={open} setOpen={setOpen}>
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
