import RouteBreadcrumbs from 'components/RouteBreadcrumbs'
import ContentHeader from 'components/common/ContentHeader'
import ProposalVotingCard from 'components/ProposalVotingCard'
import BalanceProposalInfo from 'components/BalanceProposalInfo'
import Button from 'components/common/Button'
import styles from './styles.module.sass'
import daoService from 'store/services/daoService'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { WalletContext } from 'context/walletContext'
import { useQuery } from 'react-query'
const Subheading = ({ text }) => {
  return <h3 className={styles.subheading}>{text}</h3>
}

const Proposal = () => {
  const { id, id1 } = useParams()
  const { state: ContextState } = useContext(WalletContext)
  const { addressContext } = ContextState
  console.log('params: ', id, id1)
  const { data, isLoading } = useQuery(
    ['daoBalance', id],
    () => daoService.getDaoInfo(id1, addressContext),
    {
      enabled: !!addressContext,
      cacheTime: 30 * 1000,
    }
  )

  console.log('data: ', data)
  return (
    <div className={styles.container}>
      <RouteBreadcrumbs text={id} daoName={data?.name} />
      <ContentHeader title={`#${id} ${data?.proposals[id - 1].summary}`} />
      <div className={styles.proposal}>
        <div className={styles.contentWrapper}>
          <Subheading text={'Voting'} />
          <div className={styles.content}>
            <div className={styles.votingCardContainer}>
              <ProposalVotingCard heading={'For'} data={data} id={id} />
              <ProposalVotingCard heading={'Against'} data={data} id={id} />
            </div>
            {/*<BalanceProposalInfo heading={'Proposal management'}>*/}
            {/*  <Button style={'primaryBtn'} text={'Cancel proposal'} />*/}
            {/*  <Button style={'lightBlueBtn'} text={'Execute proposal'} />*/}
            {/*</BalanceProposalInfo>*/}

            <BalanceProposalInfo heading={'Your vote'}>
              <div className={styles.infoRow}>
                <p className={styles.parameter}>
                  Voting power, {`${data?.token.value0}`}
                </p>
                <p className={styles.value}>{data?.userBalance}</p>
              </div>
              <div className={styles.buttonsWrapper}>
                <Button
                  text={'Vote for'}
                  style={'greenBtn'}
                  onClick={async (e) => {
                    // console.log('deployedActions: ', deployedActions)
                    await daoService
                      .castVote(data.daoAddress, true, id, addressContext)
                      .catch((e) => {
                        return
                      })
                  }}
                />
                <Button
                  text={'Vote against'}
                  style={'redBtn'}
                  onClick={async (e) => {
                    // console.log('deployedActions: ', deployedActions)
                    await daoService
                      .castVote(data.daoAddress, false, id, addressContext)
                      .catch((e) => {
                        return
                      })
                  }}
                />
              </div>
              <div className={styles.infoRow}>
                <p className={styles.parameter}>Vote weight</p>
                <p className={styles.value}>11.65</p>
              </div>
              <Button
                disabled={true}
                style={'disabledBtn'}
                text={'Unlock Tokens'}
                onClick={async (e) => {
                  // console.log('deployedActions: ', deployedActions)
                  await daoService
                    .unlockVotes(data.daoAddress, id, addressContext)
                    .catch((e) => {
                      return
                    })
                }}
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
