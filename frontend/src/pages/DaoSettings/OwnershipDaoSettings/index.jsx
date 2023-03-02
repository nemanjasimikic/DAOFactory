import { useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../../../components/common/Sidebar'
import ContentHeader from '../../../components/common/ContentHeader'
import Input from '../../../components/common/Input'
import FormHeading from '../../../components/common/Form/FormHeading'
import Button from '../../../components/common/Button'
import styles from '../styles.module.sass'
import daoService from 'store/services/daoService'
import Form from 'components/common/Form'
import { useForm } from 'react-hook-form'
import Spinner from 'components/common/Spinner'
import { WalletContext } from 'context/walletContext'
import { validator, checkValidity } from 'helpers/formValidator'

const OwnershipDaoSettings = () => {
  const { state: ContextState } = useContext(WalletContext)
  const { addressContext } = ContextState
  const navigate = useNavigate()
  const { id } = useParams()
  let [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    ownerAddress: '',
  })
  let [pageChecked, setPageChecked] = useState(false)

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const {
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <div>
      {' '}
      {loading && <Spinner />}
      <div className={styles.container}>
        <div className={styles.daoSettings}>
          <Sidebar id={id} />
          <div className={styles.contentWrapper}>
            <ContentHeader title={'DAO settings'} />
            <Form
              id={'ownershipForm'}
              handleSubmit={handleSubmit}
              errors={errors}
              formData={formData}
            >
              <FormHeading heading={'Ownership'} />
              <p>Transfer ownership to another address</p>
              <Input
                formId={'ownershipForm'}
                id="ownerAddress"
                validated={pageChecked}
                label={'New owner address'}
                placeholder={'Enter address'}
                registerInput={'ownerAddress'}
                value={formData.ownerAddress}
                onChange={onChange}
              />
              <Button
                style={'primaryBtn'}
                text={'Transfer'}
                onClick={async (e) => {
                  setLoading(true)
                  setPageChecked(true)
                  let canNavigate = true
                  function navigateOff(canNavigate) {
                    setLoading(false)
                    if (canNavigate) {
                      alert('Ownership is transferred!')
                      navigate('/')
                    }
                  }

                  let pageValidity0 = validator(
                    formData.ownerAddress,
                    0,
                    'ownerAddress',
                    false,
                    null
                  )

                  if (checkValidity(pageValidity0) === true) {
                    console.log('DID PASS CHECK!')
                    await daoService
                      .transferOwnership(
                        formData.ownerAddress,
                        id,
                        addressContext
                      )
                      .catch((e) => {
                        setLoading(false)
                        canNavigate = false
                        return
                      })
                    navigateOff(canNavigate)
                  }
                  setLoading(false)
                }}
              />
              <p>Transfer ownership to Black Hole</p>
              <Button
                style={'primaryBtn'}
                text={'Transfer to Black Hole'}
                onClick={async (e) => {
                  setLoading(true)
                  let canNavigate = true
                  function navigateOff(canNavigate) {
                    setLoading(false)
                    if (canNavigate) {
                      alert('Contract is destroyed!')
                      navigate('/')
                    }
                  }
                  e.preventDefault()
                  await daoService.destroy(id, addressContext).catch((e) => {
                    setLoading(false)
                    canNavigate = false
                    return
                  })
                  navigateOff(canNavigate)
                }}
              />
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OwnershipDaoSettings
