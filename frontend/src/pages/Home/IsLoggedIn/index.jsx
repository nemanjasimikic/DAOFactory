import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import ContentHeader from 'components/common/ContentHeader'
import Button from 'components/common/Button'
import NoResults from 'components/NoResults'
import DaoCard from 'components/DaoCard'
import Table from 'components/common/Table'

import styles from './styles.module.sass'

const IsLoggedIn = () => {
  const [renderTable, setRenderTable] = useState(true)

  const onLoadEffect = () => {
    setTimeout(() => {
      setRenderTable(false)
    }, 1000)
  }

  useEffect(onLoadEffect, [])

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

  const data = [
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

  return (
    <div className={styles.isLoggedIn}>
      <h1>The simplest way to manage your own DAO</h1>
      <ContentHeader title={'Your DAOs'}>
        <div className={styles.buttonWrapper}>
          <Link to={'/create-dao'}>
            <Button type={'lightBlueBtn'} text={'Create new DAO'} />
          </Link>
          <Button type={'primaryBtn'} text={'Add existing DAO'} />
        </div>
      </ContentHeader>
      {/*<NoResults />*/}
      {renderTable ? (
        <Table columns={columns} data={data} />
      ) : (
        <div className={styles.daoCardsWrapper}>
          <DaoCard />
          <DaoCard />
          <DaoCard />
          <DaoCard />
        </div>
      )}
    </div>
  )
}

export default IsLoggedIn
