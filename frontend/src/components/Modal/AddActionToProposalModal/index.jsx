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
  // const [typeValue, setTypeValue] = useState(type[0])
  // const [networkValue, setNetworkValue] = useState(network[0])
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <Modal title={'Add action to proposal'} open={open} setOpen={setOpen}>
      <Select
        name={formData.typeValue[0].name}
        label={'Type'}
        id="type"
        options={formData.typeValue}
        value={formData.typeValue[0].value}
        registerSelect={'type'}
        onChange={onChange}
      />
      <Select
        name={formData.networkValue[0].name}
        label={'Network'}
        id="network"
        options={formData.networkValue}
        value={formData.networkValue[0].value}
        registerSelect={'network'}
        onChange={onChange}
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
