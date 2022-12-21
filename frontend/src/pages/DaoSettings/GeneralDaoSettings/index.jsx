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
    daoSlug: 'daobuilder.io/',
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

  let daoRootAddr
  let name
  let slug
  let description

  if (dao) {
    for (let i = 0; i < dao.allDAOs.length; i++) {
      if (i == id) {
        daoRootAddr = dao.allDAOs[i].address
        name = dao.allDAOs[i].name
        slug = dao.allDAOs[i].slug
        description = dao.allDAOs[i].description
      }
    }
  }

  async function setSettingsChanges(name, slug, description, id) {
    //const factory = getFactory()
    const daoFactoryContract = new ever.Contract(
      daoFactoryAbi,
      dao.factoryAddress[0]._address
    )
    const daoAddresses = await daoFactoryContract.methods
      .getDeployedDAOs({})
      .call()

    let daoRootAddress
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

      console.log('trx: ', trx)
      return Promise.resolve(trx)
    } catch (e) {
      console.log('error: ', e)
      return Promise.reject(e)
    }
  }
  console.log('fd: ', formData.daoSlug)
  const slugArray =
    formData.daoSlug !== 'daobuilder.io/' ? formData.daoSlug.split('/') : null
  console.log('slugArray: ', slugArray)
  console.log('slug: ', slug)
  const slugChange = slugArray ? slugArray[1] : slug.split('/')[1]
  console.log('slugChange: ', slugChange)

  return (
    <div className={styles.container}>
      <div className={styles.daoSettings}>
        <Sidebar id={id} />
        <div className={styles.contentWrapper}>
          <ContentHeader title={'DAO settings'} />
          <Form
            id="settingsForm"
            handleSubmit={handleSubmit}
            heading={'General'}
          >
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
              defaultValue={name}
              onChange={onChange}
            />
            <Input
              id="daoSlug"
              label={'DAO slug'}
              placeholder={'address'}
              registerInput={'daoSlug'}
              defaultValue={slug}
              onChange={onChange}
            />

            <label>Description(optional)</label>
            <textarea
              id="description"
              {...register('description')}
              defaultValue={description}
              onChange={onChange}
            />
            <Button
              formId={'settingsForm'}
              style={'bigLightBlueBtn'}
              text={'Save changes'}
              onClick={async (e) => {
                // handleSubmit(e)
                e.preventDefault()
                await setSettingsChanges(
                  formData.name !== '' ? formData.name : name,
                  slugChange,
                  formData.description !== ''
                    ? formData.description
                    : description,
                  id
                )
                alert('Changes are saved!')
                navigate('/')
              }}
            />
          </Form>
        </div>
      </div>
    </div>
  )
}

export default GeneralDaoSettings
