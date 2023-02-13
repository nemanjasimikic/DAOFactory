import { useState, useContext } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import RouteBreadcrumbs from 'components/RouteBreadcrumbs'
import ContentHeader from 'components/common/ContentHeader'
import NoResults from 'components/NoResults'
import AddActionToProposalModal from 'components/Modal/AddActionToProposalModal'
import Input from 'components/common/Input'
import Button from 'components/common/Button'
import styles from './styles.module.sass'
import editIcon from 'static/svg/editIcon.svg'
import addIcon from 'static/svg/addIcon.svg'
import daoService from 'store/services/daoService'
import { WalletContext } from 'context/walletContext'
import { useQuery } from 'react-query'
import Spinner from '../../components/common/Spinner'

const CreateProposal = () => {
  const navigate = useNavigate()
  const { state: ContextState } = useContext(WalletContext)
  const { addressContext } = ContextState

  const { id } = useParams()
  const { data } = useQuery(
    ['daoRoot', id],
    () => daoService.getDaoInfo(id, addressContext),
    {
      enabled: !!addressContext,
    }
  )
  let [loading, setLoading] = useState(false)

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const [deployedActions, setDeployedActions] = useState([])
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    target_contract_address: '',
    payload: '',
    attached_value: 0,
    typeValue: 'Custom action',
    networkValue: 'Everscale',
    title: '',
  })

  const addAction = (type) => {
    let action = {
      type: type,
      value: formData.attached_value,
      target: formData.target_contract_address,
      payload: formData.payload,
    }
    deployedActions.push(action)
  }

  console.log('deployedActions: ', deployedActions)
  return (
    <>
      <div className={styles.container}>
        {loading && <Spinner />}
        <RouteBreadcrumbs text={'Make new proposal'} daoName={data?.name} />
        <ContentHeader title={'Make new proposal'} />
        {/*<NoResults />*/}
        <div className={styles.contentWrapper}>
          <div className={`${styles.wrapper} ${styles.left}`}>
            <h3>Description</h3>
            <Input
              id={'title'}
              label={'Title'}
              registerInput={'title'}
              placeholder={'Input text'}
              onChange={onChange}
            />
            <Input
              id={'discussion'}
              label={'Discussion link'}
              registerInput={'discussion'}
              placeholder={'Input text'}
            />
            <label>Description(optional)</label>
            <textarea rows={6} />
          </div>
          <div className={`${styles.wrapper} ${styles.right}`}>
            <h3>Actions</h3>
            <div className={styles.line} />
            {deployedActions.map((action, index) => {
              return (
                <div key={index} className={styles.action}>
                  <div className={styles.actionRow}>
                    <p className={styles.actionName}>{action.type}</p>
                    <img src={editIcon} alt={'edit action'} />
                  </div>
                  <div className={styles.line} />
                </div>
              )
            })}
            <button onClick={() => setOpen(true)}>
              <img src={addIcon} alt={'add action'} />
              <p>Add action</p>
            </button>
          </div>
        </div>
        <div className={styles.bottomLine} />
        <div className={styles.buttonWrapper}>
          <Button
            style={'lightBlueBtn'}
            text={'Publish proposal'}
            onClick={async (e) => {
              setLoading(true)

              let canNavigate = true
              function navigateOff(canNavigate) {
                setLoading(false)
                if (canNavigate) {
                  navigate(`/dao/${id}`)
                }
              }
              console.log('deployedActions: ', deployedActions)
              await daoService
                .createProposal(
                  addressContext,
                  data.daoAddress,
                  formData.title,
                  deployedActions
                )
                .catch((e) => {
                  setLoading(false)
                  canNavigate = false
                  return
                })
              navigateOff(canNavigate)
            }}
          />
        </div>
      </div>
      {
        <AddActionToProposalModal
          open={open}
          setOpen={setOpen}
          formData={formData}
          setFormData={setFormData}
          addAction={addAction}
        />
      }
    </>
  )
}

export default CreateProposal
