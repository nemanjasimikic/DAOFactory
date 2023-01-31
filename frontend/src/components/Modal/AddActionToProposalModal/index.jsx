import { useState } from 'react'

import Modal from '../index'
import Input from 'components/common/Input'
import Button from 'components/common/Button'
import Select from 'components/common/Select'
import styles from './styles.module.sass'

const AddActionToProposalModal = ({
  open,
  setOpen,
  formData,
  setFormData,
  addAction,
}) => {
  const type = [
    { name: 'Custom action', value: 1 },
    { name: 'Simple proposal', value: 2 },
  ]
  const network = [{ name: 'Everscale', value: 1 }]
  const [typeValue, setTypeValue] = useState(type[0])
  const [networkValue, setNetworkValue] = useState(network[0])
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  console.log('open: ', open)
  return (
    <Modal title={'Add action to proposal'} open={open} setOpen={setOpen}>
      <Select
        label={'Type'}
        id="type"
        options={type}
        value={typeValue}
        registerSelect={'type'}
        onChange={(o) => setTypeValue(o)}
      />
      <Select
        label={'Network'}
        id="network"
        options={network}
        value={networkValue}
        registerSelect={'network'}
        onChange={(o) => setNetworkValue(o)}
      />
      <Input
        label={'Target contract address'}
        registerInput={'target_contract_address'}
        value={formData.target_contract_address}
        onChange={onChange}
      />
      <Input
        label={'Payload'}
        registerInput={'payload'}
        value={formData.payload}
        onChange={onChange}
      />
      <Input
        label={'Attached value, TON'}
        registerInput={'attached_value'}
        value={formData.attached_value}
        onChange={onChange}
      />
      <div className={styles.buttonWrapper}>
        <Button
          text={'Cancel'}
          style={'primaryBtn'}
          onClick={() => setOpen(!open)}
        />
        <Button
          text={'Submit'}
          style={'lightBlueBtn'}
          onClick={() => {
            addAction(formData.type)
            setOpen(false)
          }}
        />
      </div>
    </Modal>
  )
}

export default AddActionToProposalModal
