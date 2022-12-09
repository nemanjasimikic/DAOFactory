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

const daoService = {
  getExpectedAddress,
  topup,
  deployFactory,
}

export default daoService
