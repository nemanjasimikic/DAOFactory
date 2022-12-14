import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from 'pages/Home'
import CreateDao from 'pages/CreateDao'
import GeneralDaoSettings from 'pages/DaoSettings/GeneralDaoSettings'
import OwnershipDaoSettings from 'pages/DaoSettings/OwnershipDaoSettings'
import Balance from 'pages/Balance'
import Header from 'components/Header'
import Footer from 'components/Footer'
import MobileFooter from 'components/Footer/MobileFooter'
import ScrollToTop from 'components/ScrollToTop'

const Navigation = () => {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="dao-settings/general/:id"
          element={<GeneralDaoSettings />}
        />
        <Route
          path="dao-settings/ownership"
          element={<OwnershipDaoSettings />}
        />
        <Route path="create-dao" element={<CreateDao />} />
        <Route path="balance" element={<Balance />} />
      </Routes>
      <Footer />
      <MobileFooter />
    </Router>
  )
}

export default Navigation
