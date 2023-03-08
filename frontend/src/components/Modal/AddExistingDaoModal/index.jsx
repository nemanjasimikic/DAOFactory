import Modal from '../index'
import Input from 'components/common/Input'
import Button from 'components/common/Button'
import styles from './styles.module.sass'

const AddExistingDaoModal = ({ open, setOpen }) => {
  return (
    <Modal title={'Add existing DAO'} open={open} setOpen={setOpen}>
      <Input label={'DAO address'} registerInput={'daoAddress'} />
      <Button style={'lightBlueBtn'} text={'Add DAO'} />
    </Modal>
  )
}

export default AddExistingDaoModal
