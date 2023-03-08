import { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { WalletContext } from 'context/walletContext'

const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to={'/'} replace />
  }
  return children
}

export default ProtectedRoute
