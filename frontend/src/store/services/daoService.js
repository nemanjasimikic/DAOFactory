import { ProviderRpcClient, Address } from 'everscale-inpage-provider'
import { toNano } from '../../helpers/decimalParser'
import { addressConverter } from '../../helpers/addressParser'
const ever = new ProviderRpcClient()

const daoTvc =
  'te6ccgECHgEABIwAAgE0AwEBAcACAEPQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgBCSK7VMg4wMgwP/jAiDA/uMC8gsbBQQdArztRNDXScMB+GYh2zzTAAGOHIMI1xgg+QEB0wABlNP/AwGTAvhC4iD4ZfkQ8qiV0wAB8nri0z8B+EMhufK0IPgjgQPoqIIIG3dAoLnytPhj0x8B+CO88rnTHwHbPPI8CQYDSu1E0NdJwwH4ZiLQ1wsDqTgA3CHHAOMCIdcNH/K8IeMDAds88jwaGgYCKCCCEC76iVS74wIgghBotV8/u+MCDAcDPCCCEC/zWO664wIgghBf6Ea+uuMCIIIQaLVfP7rjAgsKCAI+MPhCbuMA+Ebyc9H4QvhFIG6SMHDeuvLj6fgA2zzyAAkUAbrtRNDXScIBjlJw7UTQ9AVwcSKAQPQOb5GT1wsf3m2NCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT4bfhs+Gv4aoBA9A7yvdcL//hicPhjcPhq4w0ZAVAw0ds8+EwhjhyNBHAAAAAAAAAAAAAAAAA3+hGvoMjO9ADJcPsA3vIAGQFQMNHbPPhKIY4cjQRwAAAAAAAAAAAAAAAAK/zWO6DIzssfyXD7AN7yABkEUCCCEATGjvW64wIgghANdPz5uuMCIIIQIcGEN7rjAiCCEC76iVS64wIYExANAzQw+Eby4Ez4Qm7jACGT1NHQ3vpA0ds82zzyABkOFAFMiPhCwwD4QvhFIG6SMHDeurDy6+n4APgAyM+FiM6Ab89AyYMG+wAPADZPbmx5IHRoZSBvd25lciBjYW4gb3BlcmF0ZSEDaDD4RvLgTPhCbuMA0ds8IY4cI9DTAfpAMDHIz4cgzoIQocGEN88LgfQAyXD7AJEw4uMA8gAZEhEAKO1E0NP/0z8x+ENYyMv/yz/Oye1UAAT4TAOqMPhG8uBM+EJu4wAhmNTTH9Mf1NHQldTTH9Mf4tN/0x/Tf9MfVVBvBgHR2zwhjh8j0NMB+kAwMcjPhyDOcc8LYQHIz5I10/Pmzs3JcPsAkTDi2zzyABkVFAA6+E34TPhL+Er4Q/hCyMv/yz/Pg8sfyx/0AM7J7VQC/PgA+ChREnDIy/9wbYBA9EP4SsjLH3FYgED0Q8j0AMlVA8jPhID0APQAz4HJIPkAyM+KAEDL/8nQVTAkyM+FiM6CgCHc1lAAAAAAAAAAAAAAAAAAA88LjiHbPMzPg1UgyM+R0ysYMswBbyZeUMsfyx/Lf8sfy3/LH87NyXD7ABcWAHz4bfhK+ExcgCD0DpTTH/QFknBt4m8C+E0BbyIhpFUggCD0Fm8CyAFvIgLLH/QAWYAg9EP4bPhKpLUf+Gr4TQA00NIAAZPSBDHe0gABk9IBMd70BPQE9ATRXwMBUDDR2zz4SyGOHI0EcAAAAAAAAAAAAAAAACExo71gyM7LH8lw+wDe8gAZAD7tRNDT/9M/0wAx0x/TH/QE+kDR+G34bPhr+Gr4Y/hiAAr4RvLgTAIK9KQg9KEdHAAUc29sIDAuNjMuMAAA'
const daoAbi = {
  'ABI version': 2,
  version: '2.2',
  header: ['pubkey', 'time', 'expire'],
  functions: [
    {
      name: 'constructor',
      inputs: [],
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

const deployFactory = async () => {
  const address = await getExpectedAddress()
  if (address) {
    console.log('Adresa u deploju: ', address)
  }

  const topupVar = await topup(address)
  if (topupVar) {
    console.log('Topup var: ', topupVar)
  }
  // const walletAddress = addressConverter(localStorage.getItem('wallet'))
  const providerState = await ever.getProviderState()
  const stateInit = await ever.getStateInit(daoAbi, deployOptions)
  const publicKey = providerState.permissions.accountInteraction.publicKey
  const daoFactoryContract = new ever.Contract(daoAbi, new Address(address))
  console.log('daoFactoryContract: ', daoFactoryContract)
  // const code = await ever.splitTvc(daoTvc)
  // const hash2 = await ever.setCodeSalt({
  //   code: code.code,
  //   salt: {
  //     structure: [{ name: 'ownerAddress', type: 'address' }],
  //     data: { ownerAddress: walletAddress },
  //   },
  // })
  // const data = {
  //   newCode: hash2.code,
  // }
  const sendTransaction = await daoFactoryContract.methods
    .constructor({})
    .sendExternal({
      stateInit: stateInit.stateInit,
      publicKey: publicKey,
      withoutSignature: true,
    })

  return sendTransaction
}

const deployDAOFromFactory = async (
  pendingPeriod,
  voting,
  quorum,
  queued,
  threshold,
  execution
) => {
  const daoAddr =
    '0:ac29024de4594ac41c924082707e650ea6edced8dce994c3d0a2b50757e70c80'
  const walletAddress = addressConverter(localStorage.getItem('wallet'))
  console.log('wallet address: ', walletAddress)
  const daoFactoryContract = new ever.Contract(daoAbi, new Address(daoAddr))
  console.log('daoFactoryContract: ', daoFactoryContract)
  const daoRootTvc =
    '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'
  const code = await ever.splitTvc(daoRootTvc)
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
    })
    .send({
      from: walletAddress,
      amount: toNano(2, 9),
      bounce: true,
    })
  return deployDao
}
const daoService = {
  getExpectedAddress,
  topup,
  deployFactory,
  deployDAOFromFactory,
}

export default daoService
