import { useState } from 'react'
import Modal from '../index'
import Input from 'components/common/Input'
import Button from 'components/common/Button'
import Select from 'components/common/Select'
import styles from './styles.module.sass'

const AddActionToProposalModal = ({ open, setOpen }) => {
  const type = [
    { name: 'Custom action', value: 1 },
    { name: 'Simple proposal', value: 2 },
  ]
  const network = [{ name: 'Everscale', value: 1 }]
  const [typeValue, setTypeValue] = useState(type[0])
  const [networkValue, setNetworkValue] = useState(network[0])

  return (
    <Modal title={'Add action to proposal'} open={open} setOpen={setOpen}>
      <Select
        label={'Type'}
        options={type}
        value={typeValue}
        onChange={(o) => setTypeValue(o)}
      />
      <Select
        label={'Network'}
        options={network}
        value={networkValue}
        onChange={(o) => setNetworkValue(o)}
      />
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
