import { useNavigate } from 'react-router-dom'
import Modal from '../index'
import Input from 'components/common/Input'
import Button from 'components/common/Button'
import styles from './styles.module.sass'

const AddExistingDaoModal = ({ open, setOpen }) => {
  const navigate = useNavigate()

  return (
    <Modal title={'Add existing DAO'} open={open} setOpen={setOpen}>
      <Input label={'DAO address'} registerInput={'daoAddress'} />
      <Button
        style={'lightBlueBtn'}
        text={'Add DAO'}
        onClick={() => navigate('add-existing-dao')}
      />
    </Modal>
  )
}

export default AddExistingDaoModal
