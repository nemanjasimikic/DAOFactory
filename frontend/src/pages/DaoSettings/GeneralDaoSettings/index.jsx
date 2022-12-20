import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Sidebar from 'components/common/Sidebar'
import ContentHeader from 'components/common/ContentHeader'
import Form from 'components/common/Form'
import Input from 'components/common/Input'
import Button from 'components/common/Button'
import styles from '../styles.module.sass'
import copy from 'static/svg/copy.svg'
import { getFactory } from 'store/features/daoSlice'
import daoAbi from '../../../helpers/DaoRoot.abi.json'
import daoFactoryAbi from '../../../helpers/DaoFactory.abi.json'
import { ProviderRpcClient } from 'everscale-inpage-provider'
const GeneralDaoSettings = () => {
  const { register } = useForm()
  const wallet = useSelector((state) => state.wallet)
  const navigate = useNavigate()
  const { id } = useParams()
  const [formData, setFormData] = useState({
    daoAddress: '',
    name: '',
    daoSlug: 'daoubilder.io/',
    description: '',
  })
  const { handleSubmit } = useForm()
  const ever = new ProviderRpcClient()
  useEffect(() => {
    if (wallet.wallet === null) {
      navigate('/')
    }
  }, [wallet, navigate])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const dao /*, isError, isLoading*/ = useSelector((state) => state.dao)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getFactory())
  }, [])

  console.log('dao: ', dao)
  console.log('formData: ', formData)
  console.log('id: ', id)

  let daoRootAddr
  if (dao) {
    for (let i = 0; i < dao.allDAOs.length; i++) {
      if (i == id) {
        daoRootAddr = dao.allDAOs[i].address
      }
    }
  }
  console.log('daoRootAddr: ', daoRootAddr)

  async function setSettingsChanges(name, slug, description, id) {
    //const factory = getFactory()
    const daoFactoryContract = new ever.Contract(
      daoFactoryAbi,
      dao.factoryAddress[0]._address
    )
    console.log('Factory address: ', dao.factoryAddress[0]._address)
    const daoAddresses = await daoFactoryContract.methods
      .getDeployedDAOs({})
      .call()

    let daoRootAddress
    console.log('daoAddresses: ', daoAddresses)
    for (let i = 0; i < daoAddresses.daoAddr.length; i++) {
      if (i == id) {
        daoRootAddress = daoAddresses.daoAddr[i][1][0]._address
      }
    }
    try {
      const providerState = await ever.getProviderState()
      const publicKey = providerState.permissions.accountInteraction.publicKey
      const daoRoot = new ever.Contract(daoAbi, daoRootAddress)
      const trx = await daoRoot.methods
        .updateDetails({ name_: name, slug_: slug, description_: description })
        .sendExternal({
          publicKey: publicKey,
          withoutSignature: true,
        })

      console.log(daoRootAddress)
      console.log('trx: ', trx)
      return Promise.resolve(trx)
    } catch (e) {
      console.log('error: ', e)
      return Promise.reject(e)
    }
  }

  async function handleClick(event, name, daoSlug, description, id) {
    event.preventDefault()
    const tx = await setSettingsChanges(name, daoSlug, description, id)
    if (tx) {
      alert(
        'A form was submitted: ' + this.state.name + ' // ' + this.state.email
      )
    }
    return tx
  }

  return (
    <div className={styles.container}>
      <div className={styles.daoSettings}>
        <Sidebar id={id} />
        <div className={styles.contentWrapper}>
          <ContentHeader title={'DAO settings'} />
          <Form handleSubmit={handleSubmit} heading={'General'}>
            <Input
              id="daoAddress"
              label={'Dao Address'}
              placeholder={'DAO Address'}
              registerInput={'daoAddress'}
              value={daoRootAddr}
              firstImage={copy}
              disabled={true}
            />
            <Input
              id="name"
              label={'Project name'}
              placeholder={'Name'}
              registerInput={'name'}
              onChange={onChange}
            />
            <Input
              id="daoSlug"
              label={'DAO slug'}
              placeholder={'address'}
              registerInput={'daoSlug'}
              onChange={onChange}
            />

            <label>Description(optional)</label>
            <textarea
              id="description"
              {...register('description')}
              onChange={onChange}
            />
            <Button
              style={'bigLightBlueBtn'}
              text={'Save changes'}
              onClick={async (e) => {
                e.preventDefault()
                await setSettingsChanges(
                  formData.name,
                  formData.daoSlug,
                  formData.description,
                  id
                )
                alert('Changes are saved!')
              }}
            />
          </Form>
        </div>
      </div>
    </div>
  )
}

export default GeneralDaoSettings
