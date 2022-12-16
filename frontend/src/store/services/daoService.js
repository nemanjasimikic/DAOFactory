import { ProviderRpcClient, Address } from 'everscale-inpage-provider'
import { toNano } from '../../helpers/decimalParser'
import { addressConverter } from '../../helpers/addressParser'
import daoRootAbi from '../../helpers/DaoRoot.abi.json'
import daoFactoryAbi from '../../helpers/DaoFactory.abi.json'
const ever = new ProviderRpcClient()

const daoTvc =
  'te6ccgECJAEABZkAAgE0AwEBAcACAEPQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgBCSK7VMg4wMgwP/jAiDA/uMC8gshBQQjA8LtRNDXScMB+GaJ+Gkh2zzTAAGOHIMI1xgg+QEB0wABlNP/AwGTAvhC4iD4ZfkQ8qiV0wAB8nri0z8B+EMhufK0IPgjgQPoqIIIG3dAoLnytPhj0x8B+CO88rnTHwHbPPI8HRsGA1LtRNDXScMB+GYi0NMD+kAw+GmpOADcIccA4wIh1w0f8rwh4wMB2zzyPCAgBgM8IIIQLvqJVLvjAiCCEGKIGqi74wIgghB8d4fEuuMCEgsHA8Yw+Eby4Ez4Qm7jACGY1NMf0x/U0dCV1NMf0x/i03/TH9N/0x9VUG8GAdTU+kDU0dDT/9TSANMf0ds8IY4fI9DTAfpAMDHIz4cgznHPC2EByM+T8d4fEs7NyXD7AJEw4ts88gAfCBoC/PgAXlD4SVUHKXDIy/9wbYBA9ENVCcjLH3FYgED0Q8j0AMlVCcjPhID0APQAz4HJIPkAyM+KAEDL/8nQVZAqyM+FiM6CgCHc1lAAAAAAAAAAAAAAAAAAA88LjiHbPMzPg1WAyM+QGejGGswBbyZeUMsfyx/Lf8sfy3/LH87MzAoJAJpVMMjOy//MygDNzclw+wD4bfhK+ExcgCD0DpTTH/QFknBt4m8C+E0BbyIhpFUggCD0Fm8CyAFvIgLLH/QAWYAg9EP4bPhKpLUf+Gr4TQA00NIAAZPSBDHe0gABk9IBMd70BPQE9ATRXwMEUCCCEC/zWO664wIgghA4RCRquuMCIIIQX+hGvrrjAiCCEGKIGqi64wIRDw4MA3gw+Eby4Ez4Qm7jACGT1NHQ3vpA0ds8IY4cI9DTAfpAMDHIz4cgzoIQ4ogaqM8LgfQAyXD7AJEw4ts88gAfDRoAfPgA+Er4TFyAIPQOlNMf9AWScG3ibwJVAgFvIiGkVSCAIPQWbwLIAW8iAssf9ABZgCD0Q/hs+EqktR/4avhMAVAw0ds8+EwhjhyNBHAAAAAAAAAAAAAAAAA3+hGvoMjO9ADJcPsA3vIAHwNsMPhG8uBM+EJu4wDTH9HbPCGOHCPQ0wH6QDAxyM+HIM6CELhEJGrPC4H0AMlw+wCRMOLbPPIAHxAaABj4APhMgCD0WzAg+GwBUDDR2zz4SiGOHI0EcAAAAAAAAAAAAAAAACv81jugyM7LH8lw+wDe8gAfBFAgghAExo71uuMCIIIQHIrpG7rjAiCCECHBhDe64wIgghAu+olUuuMCHhkWEwM0MPhG8uBM+EJu4wAhk9TR0N76QNHbPNs88gAfFBoBTIj4QsMA+EL4RSBukjBw3rqw8uvp+AD4AMjPhYjOgG/PQMmDBvsAFQA2T25seSB0aGUgb3duZXIgY2FuIG9wZXJhdGUhA2gw+Eby4Ez4Qm7jANHbPCGOHCPQ0wH6QDAxyM+HIM6CEKHBhDfPC4H0AMlw+wCRMOLjAPIAHxgXACjtRNDT/9M/MfhDWMjL/8s/zsntVAAE+EwCRDD4Qm7jAPhG8nPU0fhC+EUgbpIwcN668uPp+AD7BNs88gAbGgA6+E34TPhL+Er4Q/hCyMv/yz/Pg8sfyx/0AM7J7VQCFu1E0NdJwgGOgOMNHB8BXnDtRND0BXBxIoBA9A5vkZPXCx/ebYn4bfhs+Gv4aoBA9A7yvdcL//hicPhjcPhqHQBDgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAFQMNHbPPhLIY4cjQRwAAAAAAAAAAAAAAAAITGjvWDIzssfyXD7AN7yAB8APu1E0NP/0z/TADHTH9Mf9AT6QNH4bfhs+Gv4avhj+GIACvhG8uBMAgr0pCD0oSMiABRzb2wgMC42My4wAAA='

const daoRootTvc =
  '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'

const deployOptions = {
  initParams: { _nonce: (Math.random() * 64000) | 0 },
  tvc: daoTvc,
}
const getExpectedAddress = async () => {
  const address = await ever.getExpectedAddress(daoFactoryAbi, deployOptions)
  if (!address) {
    // console.log('Nema adrese')
  } else {
    localStorage.setItem('daoAddr', JSON.stringify(address._address))
  }
  return address._address
}

const getAddressForRoot = async () => {
  const deployParams = {
    initParams: { _nonce: (Math.random() * 64000) | 0 },
    tvc: daoRootTvc,
  }
  try {
    const address = await ever.getExpectedAddress(daoRootAbi, deployParams)
    if (!address) {
    } else {
      const rootAddressObject = {
        rootAddress: address._address,
        nonce: deployParams.initParams._nonce,
      }
      localStorage.setItem('daoRootAddress', JSON.stringify(rootAddressObject))
    }
    return Promise.resolve(address._address)
  } catch (error) {
    return Promise.reject(error)
  }
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
    }

    const code = await ever.splitTvc(daoTvc)
    const hash2 = await ever.setCodeSalt({
      code: code.code,
      salt: {
        structure: [{ name: 'ownerAddress', type: 'address' }],
        data: { ownerAddress: walletAddress },
      },
    })
    const stateInit = await ever.getStateInit(daoFactoryAbi, deployOptions)
    const daoFactoryContract = new ever.Contract(
      daoFactoryAbi,
      new Address(address)
    )
    console.log('daoFactoryContract: ', daoFactoryContract)

    const providerState = await ever.getProviderState()
    const publicKey = providerState.permissions.accountInteraction.publicKey
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
  const daoFactoryContract = new ever.Contract(
    daoFactoryAbi,
    new Address(daoAddr)
  )
  console.log('daoFactoryContract: ', daoFactoryContract)
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
      amount: toNano(1, 9),
      bounce: true,
    })
  console.log('deployDao: ', deployDao)
  return deployDao
}

const getFactory = async () => {
  try {
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
    //  console.log('accounts: ', accounts)
    return Promise.resolve(accounts.accounts)
  } catch (e) {
    console.log('error: ', e)
    return Promise.reject(e)
  }
}

const addDaoRootToFactory = async (
  daoFactoryContract,
  newDaoAddress,
  publicKey
) => {
  try {
    const novi = await daoFactoryContract.methods
      .addNewDao({
        newDao: newDaoAddress,
      })
      .sendExternal({
        publicKey: publicKey,
        withoutSignature: true,
      })
    return Promise.resolve(novi)
  } catch (e) {
    console.log('error: ', e)
    return Promise.reject(e)
  }
}

const getAllDAOs = async () => {
  const factory = await getFactory()
  console.log(factory)
  let rootData = []
  try {
    if (factory.length > 0) {
      const daoFactoryContract = new ever.Contract(
        daoFactoryAbi,
        factory[0]._address
      )
      let daoAddresses = await getDeployedDaos(daoFactoryContract)
      console.log('daoAddresses u getAllDAOs: ', daoAddresses)
      for (let i = 0; i < daoAddresses.daoAddr.length; i++) {
        const daoRootContract = new ever.Contract(
          daoRootAbi,
          daoAddresses.daoAddr[i][1][0]._address
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
          address: daoAddresses.daoAddr[i][1][0]._address,
        })
        console.log('Returned DAOs: ', daoAddresses.daoAddr[i][1])
      }

      const code = await ever.splitTvc(daoRootTvc)
      const walletAddress = addressConverter(localStorage.getItem('wallet'))

      const bocHashEver = await ever.getBocHash(code.code)
      console.log('bocHash: ', bocHashEver)
      const accounts = await ever.getAccountsByCodeHash({
        codeHash: bocHashEver,
        limit: 50,
      })
      console.log('accounts: ', accounts)
      if (accounts.accounts.length > 0) {
        for (let i = 0; i < accounts.accounts.length; i++) {
          let flag = 0
          for (let j = 0; j < daoAddresses.daoAddr.length; j++) {
            if (
              accounts.accounts[i]._address ===
              daoAddresses.daoAddr[j][1][0]._address
            ) {
              console.log(`adresa: ${accounts.accounts[i]._address} postoji`)
              flag = 1
            }
          }
          if (flag === 0) {
            const daoRootContract = new ever.Contract(
              daoRootAbi,
              accounts.accounts[i]._address
            )
            const admin = await daoRootContract.methods
              .getAdmin({ answerId: 0 })
              .call()
            console.log('admin u proveri: ', admin.value0)
            if (admin.value0._address === walletAddress) {
              console.log('admin.value0._address: ', admin.value0._address)
              console.log('walletAddress: ', walletAddress)
              console.log('Jednaki su!')
              const name = await daoRootContract.methods.name({}).call()
              console.log('Name: ', name)
              const description = await daoRootContract.methods
                .description({})
                .call()
              console.log('description: ', description)
              const slug = await daoRootContract.methods.slug({}).call()
              console.log('slug: ', slug)
              const providerState = await ever.getProviderState()
              const publicKey =
                providerState.permissions.accountInteraction.publicKey
              const novi = await addDaoRootToFactory(
                daoFactoryContract,
                accounts.accounts[i]._address,
                publicKey
              )
              daoAddresses = await getDeployedDaos(daoFactoryContract)
              console.log('novi: ', novi)
              rootData.push({
                name: name.name,
                description: description.description,
                slug: slug.slug,
                address: accounts.accounts[i]._address,
              })
              console.log(rootData)
            }
          }
        }

        //localStorage.setItem('rootData', JSON.stringify(rootData))
        /*localStorage.setItem(
          'daoAddresses',
          JSON.stringify(daoAddresses.daoAddr)
        )*/
        console.log('rootData: ', rootData)
      }
      return Promise.resolve(rootData)
    } else {
      const code = await ever.splitTvc(daoRootTvc)
      const walletAddress = addressConverter(localStorage.getItem('wallet'))

      const bocHashEver = await ever.getBocHash(code.code)
      console.log('bocHash: ', bocHashEver)
      const accounts = await ever.getAccountsByCodeHash({
        codeHash: bocHashEver,
        limit: 50,
      })
      console.log('accounts: ', accounts)
      if (accounts.accounts.length > 0) {
        for (let i = 0; i < accounts.accounts.length; i++) {
          const daoRootContract = new ever.Contract(
            daoRootAbi,
            accounts.accounts[i]._address
          )
          // console.log('daoRootContract: ', daoRootContract)
          const admin = await daoRootContract.methods
            .getAdmin({ answerId: 0 })
            .call()
          console.log('admin: ', admin)
          if (admin.value0._address === walletAddress) {
            const name = await daoRootContract.methods.name({}).call()
            console.log('Name: ', name)
            const description = await daoRootContract.methods
              .description({})
              .call()
            console.log('description: ', description)
            const slug = await daoRootContract.methods.slug({}).call()
            console.log('slug: ', slug)
            rootData.push({
              name: name.name,
              description: description.description,
              slug: slug.slug,
              address: accounts.accounts[i]._address,
            })
            console.log(rootData)
            //localStorage.setItem('rootData', JSON.stringify(rootData))
          }
        }
        return Promise.resolve(rootData)
      }
    }
  } catch (e) {
    return Promise.reject(e)
  }
}

const getDeployedDaos = async (daoFactoryContract) => {
  try {
    const daoAddresses = await daoFactoryContract.methods
      .getDeployedDAOs({})
      .call()

    return Promise.resolve(daoAddresses)
  } catch (e) {
    console.log('error: ', e)
    return Promise.reject(e)
  }
}

const transferOwnership = async (newOwnerAddress, id) => {
  const factory = await getFactory()
  const daoFactoryContract = new ever.Contract(
    daoFactoryAbi,
    factory[0]._address
  )
  const daoAddresses = await getDeployedDaos(daoFactoryContract)
  /*const daoFactoryContract = new ever.Contract(
    daoFactoryAbi,
    factory[0]._address
  )
  console.log('Factory address: ', factory[0]._address)
  const daoAddresses = await daoFactoryContract.methods
    .getDeployedDAOs({})
    .call()
*/
  let daoRootAddress
  let nonce
  console.log('daoAddresses: ', daoAddresses)
  for (let i = 0; i < daoAddresses.daoAddr.length; i++) {
    if (i == id) {
      console.log('usao sam')
      daoRootAddress = daoAddresses.daoAddr[i][1][0]._address
      //console.log()
      nonce = daoAddresses.daoAddr[i][0]
    }
  }

  try {
    const walletAddress = addressConverter(localStorage.getItem('wallet'))

    const daoRoot = new ever.Contract(daoRootAbi, daoRootAddress)
    console.log('daoRootAddress: ', daoRootAddress)
    console.log('new owner: ', newOwnerAddress)
    const trx = await daoRoot.methods
      .transferAdmin({ newAdmin: newOwnerAddress })
      .send({ from: walletAddress, amount: toNano(1, 9), bounce: false })
    console.log('trx: ', trx)
    const providerState = await ever.getProviderState()
    const publicKey = providerState.permissions.accountInteraction.publicKey
    const deleteOld = await daoFactoryContract.methods
      .removeDao({ nonce: nonce })
      .sendExternal({
        publicKey: publicKey,
        withoutSignature: true,
      })
    console.log('deleteOld: ', deleteOld)
    return Promise.resolve(trx)
  } catch (e) {
    console.log('error: ', e)
    return Promise.reject(e)
  }
}

const destroy = async (id) => {
  const factory = await getFactory()
  const daoFactoryContract = new ever.Contract(
    daoFactoryAbi,
    factory[0]._address
  )
  const daoAddresses = await getDeployedDaos(daoFactoryContract)
  let daoRootAddress
  let nonce
  console.log('daoAddresses: ', daoAddresses)
  for (let i = 0; i < daoAddresses.daoAddr.length; i++) {
    if (i == id) {
      console.log('usao sam')
      daoRootAddress = daoAddresses.daoAddr[i][1][0]._address
      //console.log()
      nonce = daoAddresses.daoAddr[i][0]
    }
  }
  const daoRoot = new ever.Contract(daoRootAbi, daoRootAddress)
  const walletAddress = addressConverter(localStorage.getItem('wallet'))
  try {
    const trx = await daoRoot.methods
      .destroy({})
      .send({ from: walletAddress, amount: toNano(1, 9), bounce: false })
    console.log('trx: ', trx)
    console.log('trx: ', trx)
    const providerState = await ever.getProviderState()
    const publicKey = providerState.permissions.accountInteraction.publicKey
    const deleteOld = await daoFactoryContract.methods
      .removeDao({ nonce: nonce })
      .sendExternal({
        publicKey: publicKey,
        withoutSignature: true,
      })
    console.log('deleteOld: ', deleteOld)
    return Promise.resolve(deleteOld)
  } catch (e) {
    console.log('error: ', e)
    return Promise.reject(e)
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
  transferOwnership,
  destroy,
  //setSettingsChanges,
}

export default daoService
