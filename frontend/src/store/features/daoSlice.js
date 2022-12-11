import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import daoService from 'store/services/daoService'

const dao = JSON.parse(localStorage.getItem('daoAddr'))
const topupV = JSON.parse(localStorage.getItem('topup'))
const deployValue = JSON.parse(localStorage.getItem('topup'))

const initialState = {
  dao: dao ? dao : null,
  topupV: topupV ? topupV : null,
  deployValue: deployValue ? deployValue : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
}

export const getExpectedAddress = createAsyncThunk(
  'getExpectedAddress',
  async (dao, thunkAPI) => {
    try {
      console.log('Dao: ', dao)
      return await daoService.getExpectedAddress()
    } catch (error) {
      return thunkAPI.rejectWithValue('')
    }
  }
)

export const topup = createAsyncThunk('topup', async (dao, thunkAPI) => {
  try {
    console.log('topup: ', dao)
    return await daoService.topup(dao)
  } catch (error) {
    console.log('error: ', error)
    return thunkAPI.rejectWithValue('')
  }
})

export const deployFactory = createAsyncThunk(
  'deployFactory',
  async (dao, thunkAPI) => {
    try {
      console.log('topup: ', dao)
      return await daoService.deployFactory()
    } catch (error) {
      console.log('error: ', error)
      return thunkAPI.rejectWithValue('')
    }
  }
)

export const deployDAOFromFactory = createAsyncThunk(
  'deployDAOFromFactory',
  async (dao, thunkAPI) => {
    try {
      const pending = localStorage.getItem('pending').replace(/[^\w\s]/gi, '')
      const voting = localStorage.getItem('voting').replace(/[^\w\s]/gi, '')
      const quorum = localStorage.getItem('quorum')
      const queued = localStorage.getItem('queued').replace(/[^\w\s]/gi, '')
      const threshold = localStorage.getItem('threshold')
      const execution = localStorage
        .getItem('execution')
        .replace(/[^\w\s]/gi, '')
      return await daoService.deployDAOFromFactory(
        parseInt(pending),
        parseInt(voting),
        parseInt(quorum),
        parseInt(queued),
        parseInt(threshold),
        parseInt(execution)
      )
    } catch (error) {
      console.log('error: ', error)
      return thunkAPI.rejectWithValue('')
    }
  }
)

export const daoSlice = createSlice({
  name: 'dao',
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
      .addCase(getExpectedAddress.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getExpectedAddress.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.dao = action.payload
      })
      .addCase(getExpectedAddress.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.dao = null
      })
      .addCase(topup.pending, (state) => {
        state.isLoading = true
      })
      .addCase(topup.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.dao = action.payload
        console.log('state.dao: ', state.dao)
      })
      .addCase(topup.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.dao = null
        console.log('rejected state dao: ', state.dao)
      })
      .addCase(deployFactory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deployFactory.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.deployValue = action.payload
        console.log('state.dao: ', state.deployValue)
      })
      .addCase(deployFactory.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.deployValue = null
      })
  },
})

export const { reset } = daoSlice.actions
export default daoSlice.reducer
