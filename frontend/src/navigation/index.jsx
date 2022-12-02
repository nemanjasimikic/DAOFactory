import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from 'pages/Home'
import Connect from 'pages/Connect'
import CreateDao from 'pages/CreateDao'
import GeneralDaoSettings from 'pages/DaoSettings/GeneralDaoSettings'
import OwnershipDaoSettings from 'pages/DaoSettings/OwnershipDaoSettings'

import Header from 'components/Header'
import Footer from 'components/Footer'
import MobileFooter from 'components/Footer/MobileFooter'

const Navigation = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="dao-settings/general" element={<GeneralDaoSettings />} />
        <Route
          path="dao-settings/ownership"
          element={<OwnershipDaoSettings />}
        />
        <Route path="connected" element={<Connect />} />
        <Route path="create-dao" element={<CreateDao />} />
      </Routes>
      <Footer />
      <MobileFooter />
    </Router>
  )
}

export default Navigation
