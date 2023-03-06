import { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { WalletContext } from 'context/walletContext'
import daoService from 'store/services/daoService'
import { useQuery } from 'react-query'
import { useForm } from 'react-hook-form'
import Sidebar from 'components/common/Sidebar'
import ContentHeader from 'components/common/ContentHeader'
import Form from 'components/common/Form'
import Input from 'components/common/Input'
import Button from 'components/common/Button'
import NotificationPopup from 'components/Popup/NotificationPopup'
import Spinner from 'components/common/Spinner'
import copy from 'static/svg/copy.svg'
import { pageInfoValidator, inputValidator } from 'helpers/formValidator'
import styles from '../styles.module.sass'

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
    () => daoService.getDaoInfo(id, addressContext),
    {
      enabled: !!addressContext,
    }
  )
  const [formData, setFormData] = useState({
    daoAddress: '',
    name: '',
    daoSlug: '',
    description: '',
  })

  const [trueInitially, setTrueInitially] = useState(false)

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
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
    <div>{<Spinner />}</div>
  )
}

export default GeneralDaoSettings
