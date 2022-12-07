import { ProviderRpcClient } from 'everscale-inpage-provider'

const walletConnect = async () => {
  const ever = new ProviderRpcClient()

  if (!(await ever.hasProvider())) {
    throw new Error('Extension is not installed')
  }

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
}

export default walletService
