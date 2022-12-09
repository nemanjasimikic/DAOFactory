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
   const balance = await getBalance(accountInteraction.address._address)
   if(balance)
   {
    console.log('Balance: ', balance)
   }
   const data = {
    address: accountInteraction.address._address,
    balance: balance
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

  return accountInteraction
}

const getBalance = async (address) => {
  const response = await ever.getBalance(address)
  console.log('response: ', response);
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
