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
  const { isLoggedIn } = ContextState
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home client={client} />} />
        <Route
          path="dao-settings/general/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <GeneralDaoSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="dao-settings/ownership/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <OwnershipDaoSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="create-dao"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <CreateDao />{' '}
            </ProtectedRoute>
          }
        />
        <Route
          path="dao/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Balance />
            </ProtectedRoute>
          }
        />
        <Route
          path="create-proposal/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <CreateProposal />
            </ProtectedRoute>
          }
        />
        <Route
          path="dao/:id/balance-management"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <BalanceManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="dao/:id1/proposal/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
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
