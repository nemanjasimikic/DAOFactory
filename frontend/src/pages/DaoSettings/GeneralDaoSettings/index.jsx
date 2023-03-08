import { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { WalletContext } from 'context/walletContext'
import daoService from 'store/services/daoService'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { useForm } from 'react-hook-form'
import Sidebar from 'components/common/Sidebar'
import ContentHeader from 'components/common/ContentHeader'
import Form from 'components/common/Form'
import Input from 'components/common/Input'
import Button from 'components/common/Button'
import NotificationPopup from 'components/Popup/NotificationPopup'
import Spinner from 'components/common/Spinner'
import { pageInfoValidator, inputValidator } from 'helpers/formValidator'
import styles from '../styles.module.sass'
import copy from 'static/svg/copy.svg'
import ImageButton from 'components/common/ImageButton'
import Table from '../../../components/common/Table'

const GeneralDaoSettings = () => {
  const { register } = useForm()
  let { id } = useParams()
  const { handleSubmit } = useForm()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  let [pageChecked, setPageChecked] = useState(false)

  const { state: ContextState } = useContext(WalletContext)
  const { addressContext } = ContextState

  const { data } = useQuery(
    ['daoInfo', id],
    () => daoService.findDAOIfNotOwner(id, addressContext),
    {
      enabled: !!addressContext,
      refetchInterval: 10,
    }
  )
  const [formData, setFormData] = useState({
    daoAddress: '',
    name: '',
    daoSlug: '',
    description: '',
  })

  const [trueInitially, setTrueInitially] = useState(false)

  const columns = [
    {
      key: 'id',
      title: '#',
      width: 100,
    },
    {
      key: 'dao',
      title: 'DAO',
      width: 400,
    },
    {
      key: 'members',
      title: 'Members',
      width: 400,
    },
    {
      key: 'address',
      title: 'Address',
      width: 400,
    },
  ]

  const dataTable = [
    {
      id: '1',
      dao: 'dao1',
      members: 'members1',
      address: 'address1',
    },
    {
      id: '2',
      dao: 'dao2',
      members: 'members2',
      address: 'address2',
    },
    {
      id: '3',
      dao: 'dao3',
      members: 'members3',
      address: 'address3',
    },
    {
      id: '4',
      dao: 'dao4',
      members: 'members4',
      address: 'address4',
    },
  ]

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
    //  setName(e.target.value)
  }

  let name
  let slug
  let description
  let slugChange

  if (data?.name) {
    let daoRootAddr = data.daoAddress ? data.daoAddress : ''
    name = data.name ? data.name : ''
    slug = data.slug ? data.slug : ''
    description = data.description ? data.description : ''

    const slugArray =
      formData.daoSlug === 'daobuilder.nswebdevelopment.com/'
        ? slug
        : formData.daoSlug

    slugChange = slugArray && slug !== '' ? slugArray : data.slug

    // setFormData()
    if (!trueInitially) {
      formData.daoSlug = slug
      formData.name = name
      setTrueInitially(true)
    }
  }

  const [slugOk, isSlugOk] = useState({})

  const onSlugChange = async (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
    const slugCheck = await daoService.checkSlug(e.target.value)
    isSlugOk(slugCheck.isSlugOk)
  }

  function onClickFunctionInImage(e) {
    e.preventDefault()
    navigator.clipboard.writeText(
      document.getElementsByName('daoAddress')[0].value
    )
  }

  const imageButtons = [
    <ImageButton
      image={copy}
      onClickFunction={(e) => onClickFunctionInImage(e)}
      style={'image1'}
    />,
  ]

  return name ? (
    <>
      <div>
        {loading && <Spinner />}
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
                  value={data.daoAddress ? data.daoAddress : ''}
                  firstImage={copy}
                  disabled={true}
                  buttons={imageButtons}
                />
                <Input
                  id="name"
                  validated={pageChecked}
                  label={'Project name'}
                  placeholder={'name'}
                  registerInput={'name'}
                  value={formData.name}
                  onChange={onChange}
                />
                <Input
                  formData={slugOk}
                  id="daoSlug"
                  validated={pageChecked}
                  label={'DAO slug'}
                  placeholder={'slug'}
                  registerInput={'daoSlug'}
                  value={formData.daoSlug}
                  onChange={onSlugChange}
                  originalSlug={slug}
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
                    setLoading(true)
                    const slugCheck = await daoService.checkSlug(
                      formData.daoSlug
                    )
                    setLoading(false)

                    let pageValidity = [
                      inputValidator(formData.name, 0, 'name', false, null),
                      inputValidator(
                        formData.daoSlug,
                        0,
                        'daoSlug',
                        false,
                        slugCheck.isSlugOk,
                        slug
                      ),
                    ]
                    setLoading(true)
                    setPageChecked(true)
                    let canNavigate = true
                    function navigateOff(canNavigate) {
                      setLoading(false)
                      if (canNavigate) {
                        setOpen(true)
                      }
                    }
                    if (pageInfoValidator(pageValidity) === true) {
                      await daoService
                        .setSettingsChanges(
                          formData.name !== '' ? formData.name : data.name,
                          slugChange,
                          formData.description !== ''
                            ? formData.description
                            : data.description,
                          data.daoAddress
                        )
                        .catch((e) => {
                          setLoading(false)
                          canNavigate = false
                          return
                        })
                      e.preventDefault()
                      navigateOff(canNavigate)
                    }
                    setLoading(false)
                  }}
                  disabled={loading}
                />
              </Form>
            </div>
          </div>
        </div>
        {<NotificationPopup open={open} setOpen={setOpen} />}
      </div>
    </>
  ) : (
    <div className={styles.container}>
      <Table columns={columns} data={dataTable} isLoading={true} />
    </div>
  )
}

export default GeneralDaoSettings
