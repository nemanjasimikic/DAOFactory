import { configureStore } from '@reduxjs/toolkit'
import walletReducer from './features/walletSlice'
import daoReducer from './features/daoSlice'

export const store = configureStore({
  reducer: {
    wallet: walletReducer,
    dao: daoReducer,
  },
})
