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

const Navigation = ({ client }) => {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home client={client} />} />
        <Route
          path="dao-settings/general/:id"
          element={<GeneralDaoSettings />}
        />
        <Route
          path="dao-settings/ownership/:id"
          element={<OwnershipDaoSettings />}
        />
        <Route path="create-dao" element={<CreateDao />} />
        <Route path="dao/:id" element={<Balance />} />
        <Route path="create-proposal/:id" element={<CreateProposal />} />
        <Route
          path="dao/:id/balance-management"
          element={<BalanceManagement />}
        />
        <Route path="dao/:id1/proposal/:id" element={<Proposal />} />
      </Routes>
      <Footer />
      <MobileFooter />
    </Router>
  )
}

export default Navigation
