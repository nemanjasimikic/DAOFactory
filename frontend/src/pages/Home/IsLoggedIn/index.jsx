import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllDAOs, reset } from 'store/features/daoSlice'
import { useSelector, useDispatch } from 'react-redux'
import ContentHeader from 'components/common/ContentHeader'
import Button from 'components/common/Button'
import NoResults from 'components/NoResults'
import DaoCard from 'components/DaoCard'
import Table from 'components/common/Table'
import daoService from 'store/services/daoService'
import styles from './styles.module.sass'
//import NoResults from 'components/NoResults'

const IsLoggedIn = () => {
  const dispatch = useDispatch()
  const [renderTable, setRenderTable] = useState(true)

  const onLoadEffect = () => {
    setTimeout(() => {
      setRenderTable(false)
    }, 3000)
  }
  useEffect(onLoadEffect, [])

  const dao = useSelector((state) => state.dao)
  useEffect(() => {
    dispatch(getAllDAOs())
  }, [])

  const getDaoList = dao.allDAOs
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

  if (getDaoList != null) {
    getDaoList.forEach((item, index) => {
      itemsList.push(
        <DaoCard
          id={getDaoList ? index : 'nema'}
          daoName={getDaoList ? item.name : 'nema'}
          description={getDaoList ? item.description : 'nema'}
          link={getDaoList ? item.slug : 'nema'}
        />
      )
    })
  }

  return (
    <div className={styles.isLoggedIn}>
      <h1>The simplest way to manage your own DAO</h1>
      <ContentHeader title={'Your DAOs'}>
        <div className={styles.buttonWrapper}>
          <Link to={'/create-dao'}>
            <Button style={'lightBlueBtn'} text={'Create new DAO'} />
          </Link>
          <Button style={'primaryBtn'} text={'Add existing DAO'} />
        </div>
      </ContentHeader>
      {getDaoList?.length < 1 ? (
        <NoResults />
      ) : renderTable ? (
        <Table columns={columns} data={data} />
      ) : (
        <div className={styles.daoCardsWrapper}>{itemsList}</div>
      )}
    </div>
  )
}

export default IsLoggedIn
