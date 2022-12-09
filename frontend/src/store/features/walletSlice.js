import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import walletService from 'store/services/walletService'

const wallet = JSON.parse(localStorage.getItem('wallet'))
const balance = JSON.parse(localStorage.getItem('balance'))

const initialState = {
  wallet: wallet ? wallet : null,
  balance: balance ? parseInt(balance * 1) / Math.pow(10, 9) : 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
}
console.log('Initial state: ', initialState.balance)
export const login = createAsyncThunk('login', async (wallet, thunkAPI) => {
  try {
    const response = await walletService.walletConnect()
    if (response) {
      console.log('Response: ', response)
    }
    return response
  } catch (error) {
    console.log('Login error: ', error)
    return thunkAPI.rejectWithValue('')
  }
})

export const logout = createAsyncThunk('logout', async () => {
  await walletService.logout()
})

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.wallet = action.payload.address
        state.balance = parseInt(action.payload.balance * 1) / Math.pow(10, 9)
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.wallet = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.wallet = null
      })
  },
})

export const { reset } = walletSlice.actions
export default walletSlice.reducer
