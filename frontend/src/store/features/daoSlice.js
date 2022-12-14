import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import daoService from 'store/services/daoService'

const dao = JSON.parse(localStorage.getItem('daoAddr'))
const topupV = JSON.parse(localStorage.getItem('topup'))
const deployValue = JSON.parse(localStorage.getItem('topup'))
const allDAOs = JSON.parse(localStorage.getItem('daoAddresses'))
const addressForRoot = JSON.parse(localStorage.getItem('daoRootAddress'))
const setUpdate = ''
const factoryAddress = ''
const initialState = {
  dao: dao ? dao : null,
  topupV: topupV ? topupV : null,
  deployValue: deployValue ? deployValue : null,
  allDAOs: allDAOs ? allDAOs : null,
  addressForRoot: addressForRoot ? addressForRoot.rootAddress : null,
  factoryAddress: factoryAddress ? factoryAddress : null,
  setUpdate: setUpdate ? setUpdate : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isDeployed: false,
}

export const getExpectedAddress = createAsyncThunk(
  'getExpectedAddress',
  async (dao, thunkAPI) => {
    try {
      return await daoService.getExpectedAddress()
    } catch (error) {
      return thunkAPI.rejectWithValue('')
    }
  }
)

export const topup = createAsyncThunk('topup', async (dao, thunkAPI) => {
  try {
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
      const pending = localStorage.getItem('pending').replace(/[^\w\s]/gi, '')
      const voting = localStorage.getItem('voting').replace(/[^\w\s]/gi, '')
      const quorum = JSON.parse(localStorage.getItem('quorum'))
      const queued = localStorage.getItem('queued').replace(/[^\w\s]/gi, '')
      const threshold = localStorage
        .getItem('threshold')
        .replace(/[^\w\s]/gi, '')
      const execution = localStorage
        .getItem('execution')
        .replace(/[^\w\s]/gi, '')
      const name = localStorage.getItem('name').replace(/[^\w\s]/gi, '')
      const slug = JSON.parse(localStorage.getItem('daoSlug'))
      const governanceToken = JSON.parse(
        localStorage.getItem('governanceToken')
      )

      const minStake = localStorage.getItem('minStake').replace(/[^\w\s]/gi, '')
      const description = JSON.parse(localStorage.getItem('description'))
      const treasury =
        JSON.parse(localStorage.getItem('treasury')) === 'on' ? true : false

      return await daoService.deployFactory(
        parseInt(pending),
        parseInt(voting),
        parseInt(quorum),
        parseInt(queued),
        parseInt(threshold),
        parseInt(execution),
        name,
        slug,
        governanceToken,
        parseInt(minStake),
        description,
        treasury
      )
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
      const threshold = localStorage
        .getItem('threshold')
        .replace(/[^\w\s]/gi, '')
      const execution = localStorage
        .getItem('execution')
        .replace(/[^\w\s]/gi, '')
      const name = localStorage.getItem('name').replace(/[^\w\s]/gi, '')
      const slug = JSON.parse(localStorage.getItem('daoSlug'))
      const governanceToken = localStorage
        .getItem('governanceToken')
        .replace(/[^\w\s]/gi, '')
      const minStake = localStorage.getItem('minStake').replace(/[^\w\s]/gi, '')
      const description = JSON.parse(localStorage.getItem('description'))
      const treasury =
        JSON.parse(localStorage.getItem('treasury')) === 'on' ? true : false
      const address = JSON.parse(localStorage.getItem('daoAddr'))

      return await daoService.deployDAOFromFactory(
        parseInt(pending),
        parseInt(voting),
        parseInt(quorum),
        parseInt(queued),
        parseInt(threshold),
        parseInt(execution),
        name,
        slug,
        governanceToken,
        parseInt(minStake),
        description,
        treasury,
        address
      )
    } catch (error) {
      console.log('error: ', error)
      return thunkAPI.rejectWithValue('')
    }
  }
)

export const getFactory = createAsyncThunk(
  'getFactory',
  async (dao, thunkAPI) => {
    try {
      const getDao = await daoService.getFactory()

      return getDao
    } catch (error) {
      console.log('getFactory error: ', error)
      return thunkAPI.rejectWithValue('')
    }
  }
)

export const getAllDAOs = createAsyncThunk(
  'getAllDAOs',
  async (dao, thunkAPI) => {
    try {
      const getDao = await daoService.getAllDAOs()

      return getDao
    } catch (error) {
      console.log('getAllDAOs error: ', error)
      return thunkAPI.rejectWithValue('')
    }
  }
)

export const getAddressForRoot = createAsyncThunk(
  'getAddressForRoot',
  async (dao, thunkAPI) => {
    try {
      const address = await daoService.getAddressForRoot()

      return address
    } catch (error) {
      console.log('getAddressForRoot error: ', error)
      return thunkAPI.rejectWithValue('')
    }
  }
)

export const setSettingsChanges = createAsyncThunk(
  'setSettingsChanges',
  async (dao, thunkAPI) => {
    try {
      return await daoService.setSettingsChanges()
    } catch (error) {
      console.log('setSettingsChanges error: ', error)
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
      state.isDeployed = false
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
        //console.log('state.dao: ', state.dao)
      })
      .addCase(topup.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.dao = null
        // console.log('rejected state dao: ', state.dao)
      })
      .addCase(deployFactory.pending, (state) => {
        state.isLoading = true
        state.isDeployed = false
      })
      .addCase(deployFactory.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isDeployed = true
        state.deployValue = action.payload
        // console.log('state.dao: ', state.deployValue)
        localStorage.setItem('flag', JSON.stringify(1))
      })
      .addCase(deployFactory.rejected, (state, action) => {
        state.isLoading = false
        state.isDeployed = false
        state.isError = true
        state.deployValue = null
      })
      .addCase(getFactory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getFactory.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.factoryAddress = action.payload
        console.log('state.dao: ', state.factoryAddress)
      })
      .addCase(getFactory.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.deployValue = null
      })
      .addCase(getAllDAOs.pending, (state) => {
        state.isLoading = true
        state.isDeployed = false
      })
      .addCase(getAllDAOs.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isDeployed = false
        state.allDAOs = action.payload
        //  console.log('state.dao: ', state.allDAOs)
      })
      .addCase(getAllDAOs.rejected, (state, action) => {
        state.isLoading = false
        state.isDeployed = false
        state.isError = true
        state.allDAOs = null
      })
      .addCase(getAddressForRoot.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAddressForRoot.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.addressForRoot = action.payload
        // console.log('state.addressForRoot: ', state.addressForRoot)
      })
      .addCase(getAddressForRoot.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.addressForRoot = null
      })
  },
})

export const { reset } = daoSlice.actions
export default daoSlice.reducer
