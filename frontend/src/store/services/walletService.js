import { ProviderRpcClient } from 'everscale-inpage-provider'
import { fromNano } from 'helpers/decimalParser'
const ever = new ProviderRpcClient()

const walletConnect = async () => {
  if (!(await ever.hasProvider())) {
    throw new Error('Extension is not installed')
  }

  const { accountInteraction } = await ever.requestPermissions({
    permissions: ['basic', 'accountInteraction'],
  })

  if (accountInteraction == null) {
    throw new Error('Insufficient permissions')
  }

  localStorage.setItem('isLoggedIn', JSON.stringify(true))
  const balance = await getBalance(accountInteraction.address._address)
  if (balance) {
  }
  const data = {
    address: accountInteraction.address._address,
    balance: fromNano(balance * 1, 9),
  }
  return data
}

const logout = async () => {
  if (!(await ever.hasProvider())) {
    throw new Error('Extension is not installed')
  }
  await ever.ensureInitialized()
  const { accountInteraction } = await ever.rawApi.disconnect({
    permissions: ['basic', 'accountInteraction'],
  })
  localStorage.removeItem('isLoggedIn')

  return accountInteraction
}

const getBalance = async (address) => {
  const response = await ever.getBalance(address)

  if (response) {
    localStorage.setItem('balance', JSON.stringify(response))
  }
  return response
}

const isLoggedIn = async () => {
  const { accountInteraction } = await ever.requestPermissions({
    permissions: ['basic', 'accountInteraction'],
  })

  if (accountInteraction == null) {
    throw new Error('Insufficient permissions')
  }

  return accountInteraction.address._address
}

const walletService = {
  walletConnect,
  logout,
  getBalance,
  isLoggedIn,
}

export default walletService
