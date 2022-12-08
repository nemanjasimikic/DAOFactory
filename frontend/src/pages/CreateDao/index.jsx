import { useState } from 'react'
import Sidebar from 'components/common/Sidebar'
import GeneralInformation from 'pages/CreateDao/GeneralInformation'
import VotingConfiguration from 'pages/CreateDao/VotingConfiguration'
import ProposalTimeline from 'pages/CreateDao/ProposalTimeline'
import Treasury from 'pages/CreateDao/Treasury'
import ContentHeader from 'components/common/ContentHeader'
import Form from 'components/common/Form'
import Button from '../../components/common/Button'
import CreateDaoInfo from 'components/CreateDaoInfo'
import rightArrow from 'static/svg/rightArrow.svg'
import leftArrow from 'static/svg/leftArrow.svg'
import styles from './styles.module.sass'
//import { getExpectedAddress } from 'store/features/daoSlice'
import { useEffect } from 'react'
import { getExpectedAddress, reset, topup, deployFactory } from 'store/features/daoSlice'
import { useSelector, useDispatch } from 'react-redux'

const CreateDao = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(0)
  const [formData, setFormData] = useState({})
  const dao = useSelector((state) => state.dao)
 useEffect(() => {
  }, [dao, dispatch])

  const FormTitles = [
    'General information',
    'Voting configuration',
    'Proposal timeline ',
    'Treasury',
  ]

  const PageDisplay = () => {
    if (page === 0) {
      return (
        <GeneralInformation formData={formData} setFormData={setFormData} />
      )
    } else if (page === 1) {
      return (
        <VotingConfiguration formData={formData} setFormData={setFormData} />
      )
    } else if (page === 2) {
      
      return <ProposalTimeline formData={formData} setFormData={setFormData} />
    } else {
      return <Treasury formData={formData} setFormData={setFormData} />
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.createDao}>
        <Sidebar page={page} setPage={setPage} />
        <div className={styles.createDaoContent}>
          <ContentHeader title={'Create new DAO'} />
          <Form heading={FormTitles[page]}>{PageDisplay()}</Form>
        </div>
        <CreateDaoInfo page={page} />
      </div>
      <div className={styles.formNavigation}>
        <Button
          type={'transparentBtn'}
          text={'Back'}
          leftArrow={leftArrow}
          onClick={() => {
            setPage((currentPage) => currentPage - 1)
            dispatch(getExpectedAddress())
          }}
        />
        <Button
          disabled={page === 3}
          onClick={() => {
            setPage((currentPage) => currentPage + 1)
            //if(dao.dao === null)
      //{
      dispatch(deployFactory())
      //}
          }}
          type={'bigLightBlueBtn'}
          rightArrow={page < 3 ? rightArrow : ''}
          text={page < 3 ? 'Next' : 'Create DAO'}
        />
      </div>
    </div>
  )
}

export default CreateDao
