import { ProviderRpcClient } from 'everscale-inpage-provider'

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

  localStorage.setItem(
    'wallet',
    JSON.stringify(accountInteraction.address._address)
  )

  // await getBalance()

  return accountInteraction.address._address
}

const logout = async () => {
  if (!(await ever.hasProvider())) {
    throw new Error('Extension is not installed')
  }
  await ever.ensureInitialized()
  const { accountInteraction } = await ever.rawApi.disconnect({
    permissions: ['basic', 'accountInteraction'],
  })

  return accountInteraction
}

const getBalance = async (address) => {
  const response = await ever.getBalance(address)
  if (response) {
    localStorage.setItem('balance', JSON.stringify(response))
  }
  return response
}

const walletService = {
  walletConnect,
  logout,
  getBalance,
}

export default walletService
