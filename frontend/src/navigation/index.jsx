import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from 'pages/Home'
import CreateDao from 'pages/CreateDao'
import GeneralDaoSettings from 'pages/DaoSettings/GeneralDaoSettings'
import OwnershipDaoSettings from 'pages/DaoSettings/OwnershipDaoSettings'
import Balance from 'pages/Balance'
import BalanceManagement from 'pages/BalanceManagement'
import CreateProposal from 'pages/CreateProposal'
import Proposal from 'pages/Proposal'
import Header from 'components/Header'
import Footer from 'components/Footer'
import MobileFooter from 'components/Footer/MobileFooter'
import ScrollToTop from 'components/ScrollToTop'
import ProtectedRoute from './ProtectedRoute'
import { useContext } from 'react'
import { WalletContext } from '../context/walletContext'

const Navigation = ({ client }) => {
  const { state: ContextState } = useContext(WalletContext)
  const {
    isLoginPending,
    isLoggedIn,
    loginError,
    addressContext,
    balanceContext,
  } = ContextState

  const isLoggedInStore = localStorage?.getItem('isLoggedIn')

  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home client={client} />} />
        <Route
          path="dao-settings/general/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedInStore}>
              <GeneralDaoSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="dao-settings/ownership/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedInStore}>
              <OwnershipDaoSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="create-dao"
          element={
            <ProtectedRoute isLoggedIn={isLoggedInStore}>
              <CreateDao />{' '}
            </ProtectedRoute>
          }
        />
        <Route
          path="dao/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedInStore}>
              <Balance />
            </ProtectedRoute>
          }
        />
        <Route
          path="create-proposal/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedInStore}>
              <CreateProposal />
            </ProtectedRoute>
          }
        />
        <Route
          path="dao/:id/balance-management"
          element={
            <ProtectedRoute isLoggedIn={isLoggedInStore}>
              <BalanceManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="dao/:id1/proposal/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedInStore}>
              <Proposal />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
      <MobileFooter />
    </Router>
  )
}

export default Navigation
