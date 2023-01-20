import Modal from '../index'
import Input from 'components/common/Input'
import Button from 'components/common/Button'
import Select from 'components/common/Select'
import styles from './styles.module.sass'

const AddActionToProposalModal = ({ open, setOpen }) => {
  const type = ['Custom action', 'Simple proposal']
  const network = ['Everscale']
  return (
    <Modal title={'Add action to proposal'} open={open} setOpen={setOpen}>
      <Select label={'Type'} options={type} />
      <Select label={'Network'} options={network} />
      <Input
        label={'Target contract address'}
        registerInput={'target-contract-address'}
      />
      <Input label={'Payload'} registerInput={'payload'} />
      <Input label={'Attached value, TON'} registerInput={'attached-value'} />
      <div className={styles.buttonWrapper}>
        <Button
          text={'Cancel'}
          style={'primaryBtn'}
          onClick={() => setOpen(!open)}
        />
        <Button text={'Submit'} style={'lightBlueBtn'} />
      </div>
    </Modal>
  )
}

export default AddActionToProposalModal
