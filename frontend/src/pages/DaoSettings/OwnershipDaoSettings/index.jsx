import { useEffect, useState } from 'react'
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

const OwnershipDaoSettings = () => {
  // const wallet = useSelector((state) => state.wallet)
  const navigate = useNavigate()
  const { id } = useParams()
  // useEffect(() => {
  //   if (wallet.wallet === null) {
  //     navigate('/')
  //   }
  // }, [wallet, navigate])
  let [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    ownerAddress: '',
  })

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
                label={'New owner address'}
                placeholder={'Enter address'}
                registerInput={'ownerAddress'}
                onChange={onChange}
              />
              <Button
                style={'primaryBtn'}
                text={'Transfer'}
                onClick={async (e) => {
                  setLoading(true)
                  let canNavigate = true
                  function navigateOff(canNavigate) {
                    setLoading(false)
                    if (canNavigate) {
                      alert('Ownership is transferred!')
                      navigate('/')
                    }
                  }
                  handleSubmit(e)
                  await daoService
                    .transferOwnership(formData.ownerAddress, id)
                    .catch((e) => {
                      console.log(e)
                      setLoading(false)
                      canNavigate = false
                      return
                    })
                  navigateOff(canNavigate)
                  //alert('Ownership is transferred!')
                  //navigate('/')
                  // e.preventDefault()
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
                  await daoService.destroy(id).catch((e) => {
                    console.log(e)
                    setLoading(false)
                    canNavigate = false
                    return
                  })
                  //alert('Contract is destroyed!')
                  //navigate('/')
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
