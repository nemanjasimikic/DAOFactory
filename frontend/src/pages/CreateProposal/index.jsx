import RouteBreadcrumbs from 'components/RouteBreadcrumbs'
import ContentHeader from 'components/common/ContentHeader'
import NoResults from 'components/NoResults'
import Input from 'components/common/Input'
import Button from 'components/common/Button'
import styles from './styles.module.sass'
import editIcon from 'static/svg/editIcon.svg'
import addIcon from 'static/svg/addIcon.svg'

const CreateProposal = () => {
  return (
    <div className={styles.container}>
      <RouteBreadcrumbs text={'Make new proposal'} />
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
          {/*<div className={styles.action}>*/}
          {/*  <div className={styles.actionRow}>*/}
          {/*    <p className={styles.actionName}>SOMETHING</p>*/}
          {/*    <img src={editIcon} alt={'edit action'} />*/}
          {/*  </div>*/}
          {/*  <div className={styles.line} />*/}
          {/*</div>*/}
          <button>
            <img src={addIcon} alt={'add action'} />
            <p>Add action</p>
          </button>
        </div>
      </div>
      <div className={styles.bottomLine} />
      <div className={styles.buttonWrapper}>
        <Button style={'lightBlueBtn'} text={'Publish proposal'} />
      </div>
    </div>
  )
}

export default CreateProposal