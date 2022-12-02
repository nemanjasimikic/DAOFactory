import Sidebar from 'components/common/Sidebar'
import ContentHeader from 'components/common/ContentHeader'
import Form from 'components/common/Form'
import Input from 'components/common/Input'
import Button from 'components/common/Button'
import styles from '../styles.module.sass'
import copy from 'static/svg/copy.svg'

const GeneralDaoSettings = () => {
  return (
    <div className={styles.container}>
      <div className={styles.daoSettings}>
        <Sidebar />
        <div className={styles.contentWrapper}>
          <ContentHeader title={'DAO settings'} />
          <Form heading={'General'}>
            <Input
              label={'Dao Address'}
              placeholder={'DAO Address'}
              registerInput={'daoAddress'}
              firstImage={copy}
            />
            <Input
              label={'Project name'}
              placeholder={'Name'}
              registerInput={'name'}
            />
            <Input
              label={'DAO slug'}
              placeholder={'address'}
              registerInput={'daoSlug'}
            />
            <label>Description(optional)</label>
            <textarea />
            <Button type={'bigLightBlueBtn'} text={'Save changes'} />
          </Form>
        </div>
      </div>
    </div>
  )
}

export default GeneralDaoSettings
