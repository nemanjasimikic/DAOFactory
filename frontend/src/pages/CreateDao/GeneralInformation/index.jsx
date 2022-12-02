import Input from 'components/common/Input'
import styles from './styles.module.sass'
import copy from 'static/svg/copy.svg'
import reloadIcon from 'static/svg/reloadIcon.svg'
import infoIcon from 'static/svg/infoIcon.svg'

const GeneralInformation = () => {
  return (
    <div className={styles.container}>
      <Input
        label={'Dao Address'}
        placeholder={'DAO Address'}
        registerInput={'daoAddress'}
        firstImage={reloadIcon}
        secondImage={copy}
      />
      <Input
        label={'Project name'}
        placeholder={'Name'}
        registerInput={'name'}
      />
      <Input
        label={'DAO slug'}
        value={'daobuilder.io/'}
        placeholder={'address'}
        registerInput={'daoSlug'}
      />
      <Input
        label={'Governance token root address'}
        placeholder={'Token address'}
        className={styles.input}
        registerInput={'governanceToken'}
        labelIcon={infoIcon}
      />
      <Input
        label={'Min stake for creating a proposal'}
        placeholder={'0'}
        registerInput={'minStake'}
      />
      <label>Description(optional)</label>
      <textarea className={styles.textarea} />
    </div>
  )
}

export default GeneralInformation
