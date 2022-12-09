import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import daoService from 'store/services/daoService'
import { ProviderRpcClient } from 'everscale-inpage-provider'
const ever = new ProviderRpcClient()

const dao = JSON.parse(localStorage.getItem('daoAddr'))
const topupV = JSON.parse(localStorage.getItem('topup'))
const deployValue = JSON.parse(localStorage.getItem('topup'))
// const balance = JSON.parse(localStorage.getItem('balance'))

const initialState = {
  dao: dao ? dao : null,
  topupV: topupV ? topupV : null,
  deployValue: deployValue ? deployValue : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
}

export const getExpectedAddress = createAsyncThunk('getExpectedAddress', async (dao, thunkAPI) => {
  try {
    console.log('Dao: ', dao);
    return await daoService.getExpectedAddress()
  } catch (error) {
    return thunkAPI.rejectWithValue('')
  }
})

export const topup = createAsyncThunk('topup', async (dao, thunkAPI) => {
    try {
        console.log('topup: ', dao);
      return await daoService.topup(dao)
    } catch (error) {
        console.log('error: ', error);
      return thunkAPI.rejectWithValue('')
    }
  })

  export const deployFactory = createAsyncThunk('deployFactory', async (dao, thunkAPI) => {
    try {
        console.log('topup: ', dao);
      return await daoService.deployFactory()
    } catch (error) {
        console.log('error: ', error);
      return thunkAPI.rejectWithValue('')
    }
  })

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
        console.log('state.dao: ', state.dao);
      })
      .addCase(topup.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.dao = null
        console.log('rejected state dao: ', state.dao);
      })
      .addCase(deployFactory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deployFactory.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.deployValue = action.payload
        console.log('state.dao: ', state.deployValue);
      })
      .addCase(deployFactory.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.deployValue = null
        console.log('rejected state dao: ', state.dao);
      })
  },
})

export const { reset } = daoSlice.actions
export default daoSlice.reducer
