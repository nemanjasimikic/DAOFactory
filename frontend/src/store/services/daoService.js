import { ProviderRpcClient, Address } from 'everscale-inpage-provider'
import { toNano } from '../../helpers/decimalParser'
import { addressConverter } from '../../helpers/addressParser'
import daoRootAbi from '../../helpers/DaoRoot.abi.json'
const ever = new ProviderRpcClient()

const daoTvc =
  'te6ccgECIAEABLkAAgE0AwEBAcACAEPQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgBCSK7VMg4wMgwP/jAiDA/uMC8gsdBQQfA8LtRNDXScMB+GaJ+Gkh2zzTAAGOHIMI1xgg+QEB0wABlNP/AwGTAvhC4iD4ZfkQ8qiV0wAB8nri0z8B+EMhufK0IPgjgQPoqIIIG3dAoLnytPhj0x8B+CO88rnTHwHbPPI8GRcGA1LtRNDXScMB+GYi0NMD+kAw+GmpOADcIccA4wIh1w0f8rwh4wMB2zzyPBwcBgIoIIIQLvqJVLvjAiCCEHx3h8S74wIOBwM8IIIQL/NY7rrjAiCCEF/oRr664wIgghB8d4fEuuMCDQwIA8Yw+Eby4Ez4Qm7jACGY1NMf0x/U0dCV1NMf0x/i03/TH9N/0x9VUG8GAdTU+kDU0dDT/9TSANMf0ds8IY4fI9DTAfpAMDHIz4cgznHPC2EByM+T8d4fEs7NyXD7AJEw4ts88gAbCRYC/PgAXlD4SVUHKXDIy/9wbYBA9ENVCcjLH3FYgED0Q8j0AMlVCcjPhID0APQAz4HJIPkAyM+KAEDL/8nQVZAqyM+FiM6CgCHc1lAAAAAAAAAAAAAAAAAAA88LjiHbPMzPg1WAyM+QGejGGswBbyZeUMsfyx/Lf8sfy3/LH87MzAsKAJpVMMjOy//MygDNzclw+wD4bfhK+ExcgCD0DpTTH/QFknBt4m8C+E0BbyIhpFUggCD0Fm8CyAFvIgLLH/QAWYAg9EP4bPhKpLUf+Gr4TQA00NIAAZPSBDHe0gABk9IBMd70BPQE9ATRXwMBUDDR2zz4TCGOHI0EcAAAAAAAAAAAAAAAADf6Ea+gyM70AMlw+wDe8gAbAVAw0ds8+EohjhyNBHAAAAAAAAAAAAAAAAAr/NY7oMjOyx/JcPsA3vIAGwRQIIIQBMaO9brjAiCCEByK6Ru64wIgghAhwYQ3uuMCIIIQLvqJVLrjAhoVEg8DNDD4RvLgTPhCbuMAIZPU0dDe+kDR2zzbPPIAGxAWAUyI+ELDAPhC+EUgbpIwcN66sPLr6fgA+ADIz4WIzoBvz0DJgwb7ABEANk9ubHkgdGhlIG93bmVyIGNhbiBvcGVyYXRlIQNoMPhG8uBM+EJu4wDR2zwhjhwj0NMB+kAwMcjPhyDOghChwYQ3zwuB9ADJcPsAkTDi4wDyABsUEwAo7UTQ0//TPzH4Q1jIy//LP87J7VQABPhMAkQw+EJu4wD4RvJz1NH4QvhFIG6SMHDeuvLj6fgA+wTbPPIAFxYAOvhN+Ez4S/hK+EP4QsjL/8s/z4PLH8sf9ADOye1UAhbtRNDXScIBjoDjDRgbAV5w7UTQ9AVwcSKAQPQOb5GT1wsf3m2J+G34bPhr+GqAQPQO8r3XC//4YnD4Y3D4ahkAQ4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABABUDDR2zz4SyGOHI0EcAAAAAAAAAAAAAAAACExo71gyM7LH8lw+wDe8gAbAD7tRNDT/9M/0wAx0x/TH/QE+kDR+G34bPhr+Gr4Y/hiAAr4RvLgTAIK9KQg9KEfHgAUc29sIDAuNjMuMAAA'
const daoAbi = {
  'ABI version': 2,
  version: '2.2',
  header: ['pubkey', 'time', 'expire'],
  functions: [
    {
      name: 'constructor',
      inputs: [{ name: 'newCode', type: 'cell' }],
      outputs: [],
    },
    {
      name: 'deploy',
      inputs: [
        { name: 'platformCode_', type: 'cell' },
        {
          components: [
            { name: 'votingDelay', type: 'uint32' },
            { name: 'votingPeriod', type: 'uint32' },
            { name: 'quorumVotes', type: 'uint128' },
            { name: 'timeLock', type: 'uint32' },
            { name: 'threshold', type: 'uint128' },
            { name: 'gracePeriod', type: 'uint32' },
          ],
          name: 'proposalConfiguration_',
          type: 'tuple',
        },
        { name: 'name_', type: 'string' },
        { name: 'slug_', type: 'string' },
        { name: 'governanceToken_', type: 'address' },
        { name: 'minStake_', type: 'uint256' },
        { name: 'description_', type: 'string' },
        { name: 'treasury_', type: 'bool' },
        { name: 'nonce_', type: 'uint32' },
      ],
      outputs: [{ name: 'value0', type: 'address' }],
    },
    {
      name: 'getDeployedDAOs',
      inputs: [],
      outputs: [{ name: 'daoAddr', type: 'map(uint32,address[])' }],
    },
    {
      name: 'withdrawGas',
      inputs: [{ name: 'gasTo', type: 'address' }],
      outputs: [],
    },
    {
      name: 'randomNonce',
      inputs: [],
      outputs: [{ name: 'randomNonce', type: 'uint32' }],
    },
    {
      name: '_nonce',
      inputs: [],
      outputs: [{ name: '_nonce', type: 'uint32' }],
    },
    {
      name: 'deployedAccounts',
      inputs: [],
      outputs: [{ name: 'deployedAccounts', type: 'map(uint32,address[])' }],
    },
  ],
  data: [{ key: 1, name: '_nonce', type: 'uint32' }],
  events: [],
  fields: [
    { name: '_pubkey', type: 'uint256' },
    { name: '_timestamp', type: 'uint64' },
    { name: '_constructorFlag', type: 'bool' },
    { name: 'randomNonce', type: 'uint32' },
    { name: '_nonce', type: 'uint32' },
    { name: 'deployedAccounts', type: 'map(uint32,address[])' },
    { name: 'daoRoot', type: 'address' },
  ],
}

const deployOptions = {
  initParams: { _nonce: (Math.random() * 64000) | 0 },
  tvc: daoTvc,
}
const getExpectedAddress = async () => {
  const address = await ever.getExpectedAddress(daoAbi, deployOptions)
  if (!address) {
    console.log('Nema adrese')
  } else {
    localStorage.setItem('daoAddr', JSON.stringify(address._address))
  }
  return address._address
}

const getAddressForRoot = async () => {
  const daoRootTvc =
    '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'
  const deployParams = {
    initParams: { _nonce: (Math.random() * 64000) | 0 },
    tvc: daoRootTvc,
  }
  const address = await ever.getExpectedAddress(daoRootAbi, deployParams)
  if (!address) {
    console.log('Nema adrese')
  } else {
    const rootAddressObject = {
      rootAddress: address._address,
      nonce: deployParams.initParams._nonce,
    }
    localStorage.setItem('daoRootAddress', JSON.stringify(rootAddressObject))
  }
  return address._address
}

const topup = async (addressDao) => {
  const giver = {
    'ABI version': 2,
    version: '2.2',
    header: ['time', 'expire'],
    functions: [
      {
        name: 'sendTransaction',
        inputs: [
          { name: 'dest', type: 'address' },
          { name: 'value', type: 'uint128' },
          { name: 'bounce', type: 'bool' },
        ],
        outputs: [],
      },
      {
        name: 'transfer',
        inputs: [
          { name: 'amount', type: 'uint128' },
          { name: 'recipient', type: 'address' },
          { name: 'deployWalletValue', type: 'uint128' },
          { name: 'remainingGasTo', type: 'address' },
          { name: 'notify', type: 'bool' },
          { name: 'payload', type: 'cell' },
        ],
        outputs: [],
      },
      {
        name: 'getMessages',
        inputs: [],
        outputs: [
          {
            components: [
              { name: 'hash', type: 'uint256' },
              { name: 'expireAt', type: 'uint64' },
            ],
            name: 'messages',
            type: 'tuple[]',
          },
        ],
      },
      {
        name: 'upgrade',
        inputs: [{ name: 'newcode', type: 'cell' }],
        outputs: [],
      },
      {
        name: 'constructor',
        inputs: [],
        outputs: [],
      },
      {
        name: 'balance',
        inputs: [{ name: 'answerId', type: 'uint32' }],
        outputs: [{ name: 'value0', type: 'uint128' }],
      },
    ],
    data: [],
    events: [],
    fields: [
      { name: '_pubkey', type: 'uint256' },
      { name: '_constructorFlag', type: 'bool' },
      { name: 'm_messages', type: 'map(uint256,uint64)' },
    ],
  }

  const giverContract = new ever.Contract(giver, addressDao)
  const walletAddress = addressConverter(localStorage.getItem('wallet'))

  const sendTransaction = await giverContract.methods
    .sendTransaction({
      value: toNano(1, 9),
      dest: addressDao,
      bounce: false,
    })
    .send({
      from: walletAddress,
      amount: toNano(1, 9),
      bounce: false,
    })
  localStorage.setItem('topupV', JSON.stringify(1))
  return sendTransaction
}

const deployFactory = async (
  pendingPeriod,
  voting,
  quorum,
  queued,
  threshold,
  execution,
  name,
  slug,
  governanceToken,
  minStake,
  description,
  treasury
) => {
  // const daoAddress = addressConverter(localStorage.getItem('daoAddr'))

  const accounts = await getFactory()
  console.log('accounts: ', accounts)
  if (accounts.length > 0) {
    const address = accounts[0]._address
    console.log('Address prvi if: ', address)
    const daoDeployer = await deployDAOFromFactory(
      pendingPeriod,
      voting,
      quorum,
      queued,
      threshold,
      execution,
      name,
      slug,
      governanceToken,
      minStake,
      description,
      treasury,
      address
    )
    console.log('Dao deployer: ', daoDeployer)
    return accounts
  } else {
    const address = await getExpectedAddress()
    const walletAddress = addressConverter(localStorage.getItem('wallet'))
    if (address) {
      console.log('Adresa u deploju: ', address)
    }

    const topupVar = await topup(address)
    if (topupVar) {
      console.log('Topup var: ', topupVar)
    }

    const code = await ever.splitTvc(daoTvc)
    const hash2 = await ever.setCodeSalt({
      code: code.code,
      salt: {
        structure: [{ name: 'ownerAddress', type: 'address' }],
        data: { ownerAddress: walletAddress },
      },
    })
    const providerState = await ever.getProviderState()
    const stateInit = await ever.getStateInit(daoAbi, deployOptions)
    const publicKey = providerState.permissions.accountInteraction.publicKey
    const daoFactoryContract = new ever.Contract(daoAbi, new Address(address))
    console.log('daoFactoryContract: ', daoFactoryContract)

    // const data = {
    //   newCode: hash2.code,
    // }
    const sendTransaction = await daoFactoryContract.methods
      .constructor({ newCode: hash2.code })
      .sendExternal({
        stateInit: stateInit.stateInit,
        publicKey: publicKey,
        withoutSignature: true,
      })
    console.log('sendTrx: ', sendTransaction)

    const daoDeployer = await deployDAOFromFactory(
      pendingPeriod,
      voting,
      quorum,
      queued,
      threshold,
      execution,
      name,
      slug,
      governanceToken,
      minStake,
      description,
      treasury,
      address
    )
    console.log('Dao deployer: ', daoDeployer)

    return sendTransaction
  }
}

const deployDAOFromFactory = async (
  pendingPeriod,
  voting,
  quorum,
  queued,
  threshold,
  execution,
  name,
  slug,
  governanceToken,
  minStake,
  description,
  treasury,
  factoryAddress
) => {
  const daoAddr = factoryAddress
  const walletAddress = addressConverter(localStorage.getItem('wallet'))
  console.log('wallet address: ', walletAddress)
  const daoFactoryContract = new ever.Contract(daoAbi, new Address(daoAddr))
  console.log('daoFactoryContract: ', daoFactoryContract)
  const daoRootTvc =
    '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'
  const code = await ever.splitTvc(daoRootTvc)
  const nonce = JSON.parse(localStorage.getItem('daoRootAddress')).nonce
  console.log('nonce: ', nonce)
  const deployDao = await daoFactoryContract.methods
    .deploy({
      platformCode_: code.code,
      proposalConfiguration_: {
        votingDelay: pendingPeriod,
        votingPeriod: voting,
        quorumVotes: quorum,
        timeLock: queued,
        threshold: threshold,
        gracePeriod: execution,
      },
      name_: name,
      slug_: slug,
      governanceToken_: governanceToken,
      minStake_: minStake,
      description_: description,
      treasury_: treasury,
      nonce_: nonce,
    })
    .send({
      from: walletAddress,
      amount: toNano(2, 9),
      bounce: true,
    })
  return deployDao
}

const getFactory = async () => {
  const code = await ever.splitTvc(daoTvc)
  const walletAddress = addressConverter(localStorage.getItem('wallet'))
  const hashEver = await ever.setCodeSalt({
    code: code.code,
    salt: {
      structure: [{ name: 'ownerAddress', type: 'address' }],
      data: { ownerAddress: walletAddress },
    },
  })
  const bocHashEver = await ever.getBocHash(hashEver.code)
  const accounts = await ever.getAccountsByCodeHash({
    codeHash: bocHashEver,
    limit: 10,
  })
  console.log('accounts: ', accounts)
  return accounts.accounts
}

const getAllDAOs = async () => {
  const factory = await getFactory()
  let rootData = []
  console.log('Factory: ', factory)
  if (factory) {
    const daoFactoryContract = new ever.Contract(daoAbi, factory[0]._address)
    const daoAddresses = await daoFactoryContract.methods
      .getDeployedDAOs({})
      .call()
    for (let i = 0; i < daoAddresses.daoAddr.length; i++) {
      const daoRootContract = new ever.Contract(
        daoRootAbi,
        daoAddresses.daoAddr[i][1][i]._address
      )
      console.log('daoRootContract: ', daoRootContract)
      const name = await daoRootContract.methods.name({}).call()
      console.log('Name: ', name)
      const description = await daoRootContract.methods.description({}).call()
      console.log('description: ', description)
      const slug = await daoRootContract.methods.slug({}).call()
      console.log('slug: ', slug)
      rootData.push({
        name: name.name,
        description: description.description,
        slug: slug.slug,
      })
      console.log('Root data: ', rootData)
      console.log('Returned DAOs: ', daoAddresses.daoAddr[i][1])
    }
    localStorage.setItem('rootData', JSON.stringify(rootData))
    localStorage.setItem('daoAddresses', JSON.stringify(daoAddresses.daoAddr))

    return daoAddresses.daoAddr[0]
  } else {
    return null
  }
}

const daoService = {
  getExpectedAddress,
  topup,
  deployFactory,
  deployDAOFromFactory,
  getFactory,
  getAllDAOs,
  getAddressForRoot,
}

export default daoService
