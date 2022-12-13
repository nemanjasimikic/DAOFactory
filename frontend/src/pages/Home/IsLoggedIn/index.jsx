import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllDAOs, reset } from 'store/features/daoSlice'
import { useSelector, useDispatch } from 'react-redux'
import ContentHeader from 'components/common/ContentHeader'
import Button from 'components/common/Button'
import NoResults from 'components/NoResults'
import DaoCard from 'components/DaoCard'
import Table from 'components/common/Table'

import styles from './styles.module.sass'

const IsLoggedIn = () => {
  const dispatch = useDispatch()
  const [renderTable, setRenderTable] = useState(true)

  const onLoadEffect = () => {
    setTimeout(() => {
      setRenderTable(false)
    }, 1000)
  }
  useEffect(onLoadEffect, [])

  const { dao, isError, isLoading } = useSelector((state) => state.dao)

  useEffect(() => {
    dispatch(getAllDAOs())
    return () => {
      reset()
    }
  }, [dao, dispatch])
  const getAddr = JSON.parse(localStorage.getItem('daoAddresses'))
  const getDaoList = JSON.parse(localStorage.getItem('rootData'))
  console.log('getDaoList: ', getDaoList)
  console.log('All DAOs in home: ', getAddr)
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
  let itemsList = []
  getDaoList.forEach((item, index) => {
    itemsList.push(
      <DaoCard
        daoName={getDaoList ? item.name : 'nema'}
        description={getDaoList ? item.description : 'nema'}
        link={getDaoList ? item.slug : 'nema'}
      />
    )
  })

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
        <div className={styles.daoCardsWrapper}>{itemsList}</div>
      )}
    </div>
  )
}

export default IsLoggedIn
