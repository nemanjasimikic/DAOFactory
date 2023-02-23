import RouteBreadcrumbs from 'components/RouteBreadcrumbs'
import ContentHeader from 'components/common/ContentHeader'
import ProposalVotingCard from 'components/ProposalVotingCard'
import BalanceProposalInfo from 'components/BalanceProposalInfo'
import Button from 'components/common/Button'
import styles from './styles.module.sass'

const Subheading = ({ text }) => {
  return <h3 className={styles.subheading}>{text}</h3>
}

const Proposal = () => {
  return (
    <div className={styles.container}>
      <RouteBreadcrumbs text={'ProposalId'} />
      <ContentHeader title={'#33 Proposal name'} />
      <div className={styles.proposal}>
        <div className={styles.contentWrapper}>
          <Subheading text={'Voting'} />
          <div className={styles.content}>
            <div className={styles.votingCardContainer}>
              <ProposalVotingCard heading={'For'} />
              <ProposalVotingCard heading={'Against'} />
            </div>
            {/*<BalanceProposalInfo heading={'Proposal management'}>*/}
            {/*  <Button style={'primaryBtn'} text={'Cancel proposal'} />*/}
            {/*  <Button style={'lightBlueBtn'} text={'Execute proposal'} />*/}
            {/*</BalanceProposalInfo>*/}

            <BalanceProposalInfo heading={'Your vote'}>
              <div className={styles.infoRow}>
                <p className={styles.parameter}>Voting power</p>
                <p className={styles.value}>2000000</p>
              </div>
              <div className={styles.buttonsWrapper}>
                <Button text={'Vote for'} style={'greenBtn'} />
                <Button text={'Vote against'} style={'redBtn'} />
              </div>
              <div className={styles.infoRow}>
                <p className={styles.parameter}>Vote weight</p>
                <p className={styles.value}>11.65</p>
              </div>
              <Button
                disabled={true}
                style={'disabledBtn'}
                text={'Unlock Tokens'}
              />
              <p className={styles.notice}>
                Your tokens are locked. You can unlock them after voting to be
                able to withdraw.
              </p>
            </BalanceProposalInfo>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Proposal
