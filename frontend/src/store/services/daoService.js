import { ProviderRpcClient, Address } from 'everscale-inpage-provider'
import { toNano } from '../../helpers/decimalParser'
import { addressConverter } from '../../helpers/addressParser'
import daoRootAbi from '../../helpers/DaoRoot.abi.json'
import daoFactoryAbi from '../../helpers/DaoFactory.abi.json'
const ever = new ProviderRpcClient()

const daoTvc =
  'te6ccgECJAEABZkAAgE0AwEBAcACAEPQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgBCSK7VMg4wMgwP/jAiDA/uMC8gshBQQjA8LtRNDXScMB+GaJ+Gkh2zzTAAGOHIMI1xgg+QEB0wABlNP/AwGTAvhC4iD4ZfkQ8qiV0wAB8nri0z8B+EMhufK0IPgjgQPoqIIIG3dAoLnytPhj0x8B+CO88rnTHwHbPPI8HRsGA1LtRNDXScMB+GYi0NMD+kAw+GmpOADcIccA4wIh1w0f8rwh4wMB2zzyPCAgBgM8IIIQLvqJVLvjAiCCEGKIGqi74wIgghB8d4fEuuMCEgsHA8Yw+Eby4Ez4Qm7jACGY1NMf0x/U0dCV1NMf0x/i03/TH9N/0x9VUG8GAdTU+kDU0dDT/9TSANMf0ds8IY4fI9DTAfpAMDHIz4cgznHPC2EByM+T8d4fEs7NyXD7AJEw4ts88gAfCBoC/PgAXlD4SVUHKXDIy/9wbYBA9ENVCcjLH3FYgED0Q8j0AMlVCcjPhID0APQAz4HJIPkAyM+KAEDL/8nQVZAqyM+FiM6CgCHc1lAAAAAAAAAAAAAAAAAAA88LjiHbPMzPg1WAyM+QGejGGswBbyZeUMsfyx/Lf8sfy3/LH87MzAoJAJpVMMjOy//MygDNzclw+wD4bfhK+ExcgCD0DpTTH/QFknBt4m8C+E0BbyIhpFUggCD0Fm8CyAFvIgLLH/QAWYAg9EP4bPhKpLUf+Gr4TQA00NIAAZPSBDHe0gABk9IBMd70BPQE9ATRXwMEUCCCEC/zWO664wIgghA4RCRquuMCIIIQX+hGvrrjAiCCEGKIGqi64wIRDw4MA3gw+Eby4Ez4Qm7jACGT1NHQ3vpA0ds8IY4cI9DTAfpAMDHIz4cgzoIQ4ogaqM8LgfQAyXD7AJEw4ts88gAfDRoAfPgA+Er4TFyAIPQOlNMf9AWScG3ibwJVAgFvIiGkVSCAIPQWbwLIAW8iAssf9ABZgCD0Q/hs+EqktR/4avhMAVAw0ds8+EwhjhyNBHAAAAAAAAAAAAAAAAA3+hGvoMjO9ADJcPsA3vIAHwNsMPhG8uBM+EJu4wDTH9HbPCGOHCPQ0wH6QDAxyM+HIM6CELhEJGrPC4H0AMlw+wCRMOLbPPIAHxAaABj4APhMgCD0WzAg+GwBUDDR2zz4SiGOHI0EcAAAAAAAAAAAAAAAACv81jugyM7LH8lw+wDe8gAfBFAgghAExo71uuMCIIIQHIrpG7rjAiCCECHBhDe64wIgghAu+olUuuMCHhkWEwM0MPhG8uBM+EJu4wAhk9TR0N76QNHbPNs88gAfFBoBTIj4QsMA+EL4RSBukjBw3rqw8uvp+AD4AMjPhYjOgG/PQMmDBvsAFQA2T25seSB0aGUgb3duZXIgY2FuIG9wZXJhdGUhA2gw+Eby4Ez4Qm7jANHbPCGOHCPQ0wH6QDAxyM+HIM6CEKHBhDfPC4H0AMlw+wCRMOLjAPIAHxgXACjtRNDT/9M/MfhDWMjL/8s/zsntVAAE+EwCRDD4Qm7jAPhG8nPU0fhC+EUgbpIwcN668uPp+AD7BNs88gAbGgA6+E34TPhL+Er4Q/hCyMv/yz/Pg8sfyx/0AM7J7VQCFu1E0NdJwgGOgOMNHB8BXnDtRND0BXBxIoBA9A5vkZPXCx/ebYn4bfhs+Gv4aoBA9A7yvdcL//hicPhjcPhqHQBDgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAFQMNHbPPhLIY4cjQRwAAAAAAAAAAAAAAAAITGjvWDIzssfyXD7AN7yAB8APu1E0NP/0z/TADHTH9Mf9AT6QNH4bfhs+Gv4avhj+GIACvhG8uBMAgr0pCD0oSMiABRzb2wgMC42My4wAAA='

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
  const daoRootTvc =
    'te6ccgECjwEAG4YAAgE0AwEBAcACAEPQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgBCSK7VMg4wMgwP/jAiDA/uMC8guLBQSGA4jtRNDXScMB+GaJ+Gkh2zzTAAGegwjXGCD5AVj4QvkQ8qje0z8B+EMhufK0IPgjgQPoqIIIG3dAoLnytPhj0x8B2zzyPIeDBgN67UTQ10nDAfhmItDTA/pAMPhpqTgA+ER/b3GCCJiWgG9ybW9zcG90+GTcIccA4wIh1w0f8rwh4wMB2zzyPIqKBgM8IIIQLBlZ3bvjAiCCEFCbuuO74wIgghB/p1f2u+MCVisHBFAgghBfSornu+MCIIIQYcDxs7vjAiCCEGvjNF+74wIgghB/p1f2u+MCJR8WCARQIIIQc8z9brrjAiCCEHhEhwe64wIgghB+3yiCuuMCIIIQf6dX9rrjAhQSEAkDNDD4RvLgTPhCbuMAIZPU0dDe+kDR2zzbPPIAiQqOApb4SfhUxwXjASD4VIvcAAAAAAAAAAAAAAAAGMjOWcjPkQK+5ErOAcjOzc3JcPsAIPh0yM74KtAByds8MPhUyM+FiM6Ab89AyYBA+wB1CwIWIYs4rbNYxwWKiuINDAEIAds8yQ4BJgHU1DAS0Ns8yM+OK2zWEszPEckOAWbViy9KQNcm9ATTCTEg10qR1I6A4osvShjXJjAByM+L0pD0AIAgzwsJz4vShswSzMjPEc4PAQSIAYYDNDD4RvLgTPhCbuMAIZPU0dDe+kDR2zzbPPIAiRGOAYD4SfhUxwXjASD4TIvcAAAAAAAAAAAAAAAAGMjOWcjPkDxLY3LOAcjOzc3JcPsA+Gz4VMjPhYjOgG/PQMmAQPsAdQPiMPhG8uBM+EJu4wDTH/hEWG91+GTR2zwhjh0j0NMB+kAwMcjPhyDOcc8LYQHIz5PhEhwezs3JcI4x+EQgbxMhbxL4SVUCbxHIz4SAygDPhEDOAfoC9ABxzwtpAcj4RG8Vzwsfzs3J+ERvFOL7AOMA8gCJE14AIPhEcG9ygEBvdHBvcfhk+EwChDD4RvLgTNTR2zwkji0m0NMB+kAwMcjPhyDOcc8LYV4wyM+TzzP1usoHy//LHwFvIgLLH/QAzclw+wCSXwTi4wDyABVeAC5wXyBVAtDSB9P/0x/TH/QFbwJeIDY0MgRQIIIQZNF+2rrjAiCCEGmteAm64wIgghBqIJEyuuMCIIIQa+M0X7rjAh0bGRcDODD4RvLgTPhCbuMAIZPU0dDe+kDTf9HbPNs88gCJGI4BmPhJ+FTHBeMBIPhOI/hNi9wAAAAAAAAAAAAAAAAYyM5VMMjPkbIDiDrOVSDIzst/y3/Nzclw+wAB+G34bvhUyM+FiM6Ab89AyYBA+wB1Aygw+Eby4Ez4Qm7jANMf0ds82zzyAIkajgGm+En4VMcF4wEgggFRgL4hgggnjQC7sPLgfSD4UG8VjQRwAAAAAAAAAAAAAAAAD3jSn6DIzssfyx/JcPsA+FABb1X4cPhUyM+FiM6Ab89AyYBA+wB1A+ow+Eby4Ez4Qm7jANMf+ERYb3X4ZNHbPCKOHyTQ0wH6QDAxyM+HIM5xzwthAsjPk6a14CbOy3/NyXCOM/hEIG8TIW8S+ElVAm8RyM+EgMoAz4RAzgH6AvQAcc8LaQLI+ERvFc8LH87Lf83J+ERvFOL7AOMA8gCJHF4AJPhEcG9ygEBvdHBvcfhk+E34TgMoMPhG8uBM+EJu4wDTH9HbPNs88gCJHo4BpvhJ+FTHBeMBIIIBUYC+IYIIJ40Au7Dy4Hog+FBvE40EcAAAAAAAAAAAAAAAABK9wGBgyM7LH8sfyXD7APhQAW9T+HD4VMjPhYjOgG/PQMmAQPsAdQRQIIIQX2Fjb7rjAiCCEF/YVN664wIgghBgck8KuuMCIIIQYcDxs7rjAiQjISABUDDR2zz4WSGOHI0EcAAAAAAAAAAAAAAAADhwPGzgyM7L/8lw+wDe8gCJAygw+Eby4Ez4Qm7jANN/0ds82zzyAIkijgG2+En4VMcF4wEggiAteYg9IAC+IYIoGN52gW2AALuw8uB8IPhQbxKNBHAAAAAAAAAAAAAAAAAHxdxmIMjOy3/Lf8lw+wD4UAFvUvhw+FTIz4WIzoBvz0DJgED7AHUBTjDR2zz4VSGOG40EcAAAAAAAAAAAAAAAADf2FTegyM7OyXD7AN7yAIkD8jD4RvLgTPhCbuMA0x/4RFhvdfhkIZPU0dDe+kDR2zwhjh0j0NMB+kAwMcjPhyDOcc8LYQHIz5N9hY2+zs3JcI4x+EQgbxMhbxL4SVUCbxHIz4SAygDPhEDOAfoC9ABxzwtpAcj4RG8Vzwsfzs3J+ERvFOL7AOMA8gCJf14EUCCCEFQqHW264wIgghBb4t42uuMCIIIQXKRuerrjAiCCEF9Kiue64wIqKScmAU4w0ds8+FghjhuNBHAAAAAAAAAAAAAAAAA30qK54MjOzslw+wDe8gCJAyow+Eby4Ez4Qm7jANTU1NHbPNs88gCJKI4AVvgAIvkA+Fb5AL2TIvh23iH5APhX+QC9kyH4d974WvkAIfkAvZMg+HreXwMBUDDR2zz4TyGOHI0EcAAAAAAAAAAAAAAAADb4t42gyM7LH8lw+wDe8gCJAU4w0ds8+EwhjhuNBHAAAAAAAAAAAAAAAAA1CodbYMjOzslw+wDe8gCJBFAgghAxTS/Iu+MCIIIQOduuBrvjAiCCEEWks9W74wIgghBQm7rju+MCTTsyLARQIIIQRpOez7rjAiCCEEkAoPG64wIgghBPrwP9uuMCIIIQUJu647rjAjAvLi0BUDDR2zz4WyGOHI0EcAAAAAAAAAAAAAAAADQm7rjgyM7KAMlw+wDe8gCJAVAw0ds8+EohjhyNBHAAAAAAAAAAAAAAAAAz68D/YMjO9ADJcPsA3vIAiQFOMNHbPPhaIY4bjQRwAAAAAAAAAAAAAAAAMkAoPGDIzszJcPsA3vIAiQMmMPhG8uBM+EJu4wDU0ds82zzyAIkxjgF8+En4VMcF4wH4cfhTpLUPIPhzjQRwAAAAAAAAAAAAAAAAFcmQE2DIzssPyXD7APhUyM+FiM6Ab89AyYBA+wB1BFAgghA9hiX6uuMCIIIQPeFtDbrjAiCCEEOLhae64wIgghBFpLPVuuMCOTc1MwMoMPhG8uBM+EJu4wDTH9HbPNs88gCJNI4BpvhJ+FTHBeMBIIIBUYC+IYIIJ40Au7Dy4Hkg+FBvEI0EcAAAAAAAAAAAAAAAABeG9ZMgyM7LH8sfyXD7APhQAW9Q+HD4VMjPhYjOgG/PQMmAQPsAdQM4MPhG8uBM+EJu4wAhk9TR0N76QNP/0ds82zzyAIk2jgHE+En4VMcF4wEh+EqBAQv0Cm+hltMf9AVvAt4gbo4UIXBtcZxYyMv/IqQDWIAg9EPkbwKOFl8gbvJ/IsjL/wFvIiGkVSCAIPRDbwLiI/hKyFUCbyICyx/0AFmBAQv0QfhqXwN1AyQw+Eby4Ez4Qm7jANHbPNs88gCJOI4BpvhV+kJvE9cL/8MA+En4VccFsPLgZvhV+FSL3AAAAAAAAAAAAAAAABjIzlnIz5EM2cKqzgHIzs3NyXD7APhV+HSJ+HX4VMjPhYjOgG/PQMmAQPsAhwMoMPhG8uBM+EJu4wDTf9HbPNs88gCJOo4BtvhJ+FTHBeMBIIIgCRhOcqAAviGCKBjedoFtgAC7sPLgeyD4UG8UjQRwAAAAAAAAAAAAAAAAB11CwuDIzst/y3/JcPsA+FABb1T4cPhUyM+FiM6Ab89AyYBA+wB1BFAgghAyGRtzuuMCIIIQOOeQb7rjAiCCEDmhBse64wIgghA5264GuuMCQD8+PAPiMPhG8uBM+EJu4wDTH/hEWG91+GTR2zwhjh0j0NMB+kAwMcjPhyDOcc8LYQHIz5Lnbrgazs3JcI4x+EQgbxMhbxL4SVUCbxHIz4SAygDPhEDOAfoC9ABxzwtpAcj4RG8Vzwsfzs3J+ERvFOL7AOMA8gCJPV4AIPhEcG9ygEBvdHBvcfhk+FUCbjD4RvLgTNMf9ARZbwIB0ds8IY4cI9DTAfpAMDHIz4cgzoIQuaEGx88Lgct/yXD7AJEw4uMA8gBvXgJ4MPhG8uBM0gfT/9Mf0x/0BFlvAgHR2zwhjhsj0NMB+kAwMcjPhyDOghC455BvzwuBzMlw+wCRMOLjAPIARF4DXjD4RvLgTPhCbuMAIZXTH9TR0JLTH+L6QNMf9ARZbwIB0x/0BFlvAgHR2zzbPPIAiUGOA374SSTbPMcF8uBp+CdvEGim/mChtX9y+wIhbxDCAI6A3iBvEMIAjoDeXwT4ScjPhYjOghBahAAszwuOyYMG+wBmS0IDVCJtIm8RcG2OgI6A6F8DIIAg9IaYIFjTH/QFbwKTbV8g4pMibrOOgOhfBUpFQwGsJPpCbxIl+kJvE9cL/13bPPgl+CNYbwP4TvhNcMjPhYDKAM+EQM4B+gKCECClANfPC4oBbyNeIMs/yx/MyXH7AFMjgCD0fJggWNMf9AVvApNtXyDibDNEACReIMjKB8v/yx8BbyICyx/0AMkCYCBvESFvECJvEiNvEyRvFG8EUxWAIPQOb6ExjoCOgOJvIgLLH/QAWYAg9EM2WyGkMkhGARwgcG1xjoDkbwJTJshVAkcBFljbPCKkA1iAIPRDSQFKVHFRIYAg9A6U0x/0BZJwbeJvAiPbPAFvIiGkVSCAIPRDbwLIAUkAFm8kXiDIy//Ln8zMARxTEoAg9A5voeMAIDJus24BYlMTjQRwAAAAAAAAAAAAAAAAH58UPuDIzssfAW8iAssf9ADJcPsAcJVTAm8QuY6A6DBMAVBTAm8RgCD0DvKy2zwgbxAhbxHIz4UIzgH6AnHPC2oBbxLPFMlx+wCkcQRQIIIQLmxONbrjAiCCEDDS3o+64wIgghAxCwq9uuMCIIIQMU0vyLrjAlRRT04DeDD4RvLgTPhCbuMA0x/0BFlvAgHR2zwhjhwj0NMB+kAwMcjPhyDOghCxTS/IzwuBy3/JcPsAkTDi4wDyAIlsXgPYMPhG8uBM+EJu4wDTH/hEWG91+GTR2zwhjhoj0NMB+kAwMcjPhyDOghCxCwq9zwuByx/JcI4v+EQgbxMhbxL4SVUCbxHIz4SAygDPhEDOAfoC9ACAas9A+ERvFc8LH8sfyfhEbxTi+wDjAPIAiVBeACD4RHBvcoBAb3Rwb3H4ZPhPA0Yw+Eby4Ez4Qm7jANMf0x/Tf9Mf03/TH1VQbwYB0ds82zzyAIlSjgL++En4VMcF4wFfIG8RggFRgL4hbxGCCCeNALuw8uB4IG8QggFRgL4hbxCCCCeNALuw8uB5IG8TggFRgL4hbxOCCCeNALuw8uB6IG8UgiAJGE5yoAC+IW8UgigY3naBbYAAu7Dy4HsgbxKCIC15iD0gAL4hbxKCKBjedoFtgAC7sHVTANLy4HwgbxWCAVGAvgFvFYIIJ40Au7Dy4H0g+FCNBHAAAAAAAAAAAAAAAAAKhT8hoMjOAW8mXlDLH8sfy3/LH8t/yx8BbyZeUMsfyx/Lf8sfy3/LH8lw+wD4cPhUyM+FiM6Ab89AyYBA+wAD4jD4RvLgTPhCbuMA0x/4RFhvdfhk0ds8IY4dI9DTAfpAMDHIz4cgznHPC2EByM+SubE41s7NyXCOMfhEIG8TIW8S+ElVAm8RyM+EgMoAz4RAzgH6AvQAcc8LaQHI+ERvFc8LH87NyfhEbxTi+wDjAPIAiVVeACD4RHBvcoBAb3Rwb3H4ZPhUBFAgghAME3Ozu+MCIIIQEg8/N7vjAiCCEBsNP8u74wIgghAsGVndu+MCd2hcVwRQIIIQIh9B8rrjAiCCECaHXfe64wIgghAr0dnbuuMCIIIQLBlZ3brjAltaWVgBUDDR2zz4UyGOHI0EcAAAAAAAAAAAAAAAACsGVndgyM7LD8lw+wDe8gCJAU4w0ds8+FIhjhuNBHAAAAAAAAAAAAAAAAAq9HZ24MjOzMlw+wDe8gCJAU4w0ds8+FchjhuNBHAAAAAAAAAAAAAAAAApodd94MjOzMlw+wDe8gCJAVAw0ds8+E4hjhyNBHAAAAAAAAAAAAAAAAAoh9B8oMjOy3/JcPsA3vIAiQRQIIIQFHslwLrjAiCCEBbRH2264wIgghAXIww6uuMCIIIQGw0/y7rjAmdkX10D5jD4RvLgTPhCbuMA0x/4RFhvdfhk0x/R2zwhjh0j0NMB+kAwMcjPhyDOcc8LYQHIz5JsNP8uzs3JcI4x+EQgbxMhbxL4SVUCbxHIz4SAygDPhEDOAfoC9ABxzwtpAcj4RG8Vzwsfzs3J+ERvFOL7AOMA8gCJZl4AKO1E0NP/0z8x+ENYyMv/yz/Oye1UAyYw+Eby4Ez4Qm7jANTR2zzbPPIAiWCOA/j4SfhUxwXjAWim/mCCEHc1lAC88uCC+CdvEGim/mChtX9y+wKIcPsA+Er4UvhR+FD4U/hP+E74TfhM+FX4VMjOVZDIzlWAyM5VcMjOy3/LH8sPAW8mXlDLH8sfy3/LH1VAyMt/yx/MzPQAzc3Nzckh+wQB0CCLOK2zWMcFdWNhARyT103Q3tdM0O0e7VPbPGIABPACACLAAAAAAAAAAAAAAAAAXBMaaANCMPhG8uBM+EJu4wAhldMP1NHQktMP4vpA0x/R2zzbPPIAiWWOAZz4SQHbPMcF8uBp+CdvEGim/mChtX9y+wIB+FO6miDIz4WIzoBvz0COHiD4U/hR+EnIz4WIznHPC25VIMjPkPZvxcrMyw/OzeLJgwb7ADBmATb4RHBvcoBAb3Rwb3H4ZNs8+QDIz4oAQMv/ydB9AU4w0ds8+FYhjhuNBHAAAAAAAAAAAAAAAAAlHslwIMjOzMlw+wDe8gCJBFAgghAO38DSuuMCIIIQEK//2rrjAiCCEBEq2KK64wIgghASDz83uuMCc3JqaQFOMNHbPPhNIY4bjQRwAAAAAAAAAAAAAAAAJIPPzeDIzs7JcPsA3vIAiQNKMPhG8uBM+EJu4wDTH9Mf9ARZbwIB0x/0BFlvAgHU0ds82zzyAIlrjgPiIm8QIm8QoCDy4G/BC/LgbiCEH/lBMDGrAoMLu/LgcSLbPCLbPGim/mACoLV/ghJUC+QAoLV/vvLgcFUCyMsfVQJvIgLLH/QAWG8iAssf9ADM+FBvFAHJ+EnbPMjPhYjOghAhPCn/zwuOzMt/yYBA+wBvbH8BHHBtcJVTA28QuY6A6FsxbQFyUwNvEYAg9A7ysts8bxFTAoAg9A5voTGOEiP4TqC1fzRTAsjPg1mAIPRDM98wIoIQHc1lAKC1fzOkbgAW0//TH9Of1NTRbwUBGnAglVMCbxC5joDoMDFwATpTAm8RgCD0DvKy2zxvEIIQHc1lAKC1fyKgtX8ypHEAENN/+kDU0W8DAW4w0ds8+FAhjiuNBHAAAAAAAAAAAAAAAAAkK//2oMjOAW8mXlDLH8sfy3/LH8t/yx/JcPsA3vIAiQMoMPhG8uBM+EJu4wDTH9HbPNs88gCJdI4BpvhJ+FTHBeMBIIIBUYC+IYIIJ40Au7Dy4Hgg+FBvEY0EcAAAAAAAAAAAAAAAAB5cKuVgyM7LH8sfyXD7APhQAW9R+HD4VMjPhYjOgG/PQMmAQPsAdQGU+En4SoEBC/QKb6GW0x/0BW8C3iBu8tSxIG7yfyBvECDy5LJopvxg+QEhwAGOHHAjbxGAIPQO8rLXC/8huvLks/hJ+EqBAQv0WTB2AMiOXXAgbW8CcJNTBLmON1MFbxGAIPQO8rLXC/8kuiOzsJJ/M44eXCdvEYAg9A7ystcL/8jL/wFvIiGkVSCAIPRDbwIy4qToMAHy5LP4SfhKyFUCbyICyx/0AFmBAQv0QeL4al8DBE4gggjaFOC64wIgghAGejGGuuMCIIIQBrC9ZLrjAiCCEAwTc7O64wKIgoF4A0Aw+Eby4Ez4Qm7jACGV0x/U0dCS0x/i+kDU0ds82zzyAIl5jgL2+Eki2zzHBfLgavgnbxBopv5gobV/cvsC0NMf0x/0BFlvAgHTH/QEWW8CAdTR+E+ktR/4b1RwEif4T40EcAAAAAAAAAAAAAAAAA60XiMgyM7LH84BbyICyx/0AAFvIgLLH/QAzMlw+wBVAvhPVQX4SXDIz4WAygDPhEDOf3oD/oKgIF9eEAAAAAAAAAAAAAAAAAAAXJk4L88Lrssfyx/LH8lx+wD4U/hQVQJVEiX4TMjOVVDIzswBbyICyx/0AAFvIgLLH/QAAW8mXlDLH8sfy3/LH8t/WcjLH8sPzc3J+FH4T9s8IPkAyM+KAEDL/8jPhYjPE3PPC24h2zzMz4N9fHsAJFUgyM+Q/YUWcszMzs3Jgwb7AAA00NIAAZPSBDHe0gABk9IBMd70BPQE9ATRXwMBEHEByMsfyds8fgB4cMjL/3BtgED0Q/gocViAQPQWWMjLB3JYgED0QwFzWIBA9Bf4UnRYgED0F8j0AMn4UsjPhID0APQAz4HJATb4RHBvcoBAb3Rwb3H4ZNs8+QDIz4oAQMv/ydCAAH5wyMv/cG2AQPRD+ExxWIBA9BbIz4WScliAQPRDAcjOyXNYgED0F/hSdFiAQPQXyPQAyfhSyM+EgPQA9ADPgckBTjDR2zz4VCGOG40EcAAAAAAAAAAAAAAAACGsL1kgyM7OyXD7AN7yAIkC2DD4Qm7jAPhG8nMhjhXU0x/TH9N/0x/Tf9MfVVBvBgHU0dCOEtTTH9Mf03/TH9N/0x9VUG8GAeL6QNTU1NHQ+kDT/9TSANH4AFUH+HJVBvhwVQX4dFUE+HZVA/h3VQL4eFj4eQH4evh72zzyAIOOAhbtRNDXScIBjoDjDYSJBGpw7UTQ9AVw+ED4QfhC+EP4RPhF+Eb4R/hI+EltcSyAQPQOb5GT1wsf3okgcF9wbwaIIHCJIIeGh4UDNIggiXCIcIAcb4DtV4BA9A7yvdcL//hicPhjhoeGAAAAQ4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABABTjDR2zz4USGOG40EcAAAAAAAAAAAAAAAACA2hTggyM7MyXD7AN7yAIkA0O1E0NP/0z/TADH0BNMf+kDU0dD6QNN/0x/TH9Mf03/TH9TR0NN/0x9VUG8GAdTU0w/6QNTR0PpA1NTU0dD6QNP/1NIA0XD4QPhB+EL4Q/hE+EX4RvhH+Ej4SYASemOAHG+A7Vf4Y/hiAAr4RvLgTAIK9KQg9KGNjAAUc29sIDAuNjMuMAEYoAAAAAIw2zz4D/IAjgCy7UdwgBxvh4Adb4IwgBxwZF8K+EP4QsjL/8s/z4P0AMsfzlXgyM7Lf8sfAW8mXlDLH8sfy3/LH1XAyMt/yx/MzMsPzlVgyM7MzFUwyM7L/8zKAM3Nzc3J7VQ='
  const deployParams = {
    initParams: { _nonce: (Math.random() * 64000) | 0 },
    tvc: daoRootTvc,
  }
  const address = await ever.getExpectedAddress(daoRootAbi, deployParams)
  if (!address) {
    // console.log('Nema adrese')
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
      // console.log('Topup var: ', topupVar)
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

    // const data = {
    //   newCode: hash2.code,
    // }
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

const getAllDAOs = async () => {
  const factory = await getFactory()
  console.log(factory)
  let rootData = []
  if (factory.length > 0) {
    const daoFactoryContract = new ever.Contract(
      daoFactoryAbi,
      factory[0]._address
    )
    const daoAddresses = await daoFactoryContract.methods
      .getDeployedDAOs({})
      .call()
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
      })
      console.log('Returned DAOs: ', daoAddresses.daoAddr[i][1])
    }
    const daoRootTvc =
      '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'

    const code = await ever.splitTvc(daoRootTvc)
    const walletAddress = addressConverter(localStorage.getItem('wallet'))

    const bocHashEver = await ever.getBocHash(code.code)
    console.log('bocHash: ', bocHashEver)
    const accounts = await ever.getAccountsByCodeHash({
      codeHash: bocHashEver,
      limit: 10,
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
            const novi = await daoFactoryContract.methods
              .addNewDao({
                newDao: accounts.accounts[i]._address,
              })
              .sendExternal({
                publicKey: publicKey,
                withoutSignature: true,
              })
            console.log('novi: ', novi)
            rootData.push({
              name: name.name,
              description: description.description,
              slug: slug.slug,
            })
            console.log(rootData)
          }
        }
      }

      localStorage.setItem('rootData', JSON.stringify(rootData))
      localStorage.setItem('daoAddresses', JSON.stringify(daoAddresses.daoAddr))
      console.log('rootData: ', rootData)
    }
    return daoAddresses.daoAddr[0]
  } else {
    const daoRootTvc =
      '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'

    const code = await ever.splitTvc(daoRootTvc)
    const walletAddress = addressConverter(localStorage.getItem('wallet'))

    const bocHashEver = await ever.getBocHash(code.code)
    console.log('bocHash: ', bocHashEver)
    const accounts = await ever.getAccountsByCodeHash({
      codeHash: bocHashEver,
      limit: 10,
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
          })
          console.log(rootData)
          localStorage.setItem('rootData', JSON.stringify(rootData))
        }
      }
      return accounts[0]
    }
    return null
  }
}

const transferOwnership = async (newOwnerAddress, id) => {
  const factory = await getFactory()
  const daoFactoryContract = new ever.Contract(
    daoFactoryAbi,
    factory[0]._address
  )
  console.log('Factory address: ', factory[0]._address)
  const daoAddresses = await daoFactoryContract.methods
    .getDeployedDAOs({})
    .call()

  let daoRootAddress
  let nonce
  console.log('daoAddresses: ', daoAddresses)
  for (let i = 0; i < daoAddresses.daoAddr.length; i++) {
    if (i === id) {
      daoRootAddress = daoAddresses.daoAddr[i][1][0]._address
      nonce = daoAddresses.daoAddr[i][0]
    }
  }

  try {
    const walletAddress = addressConverter(localStorage.getItem('wallet'))

    const daoRoot = new ever.Contract(daoRootAbi, daoRootAddress)
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

const daoService = {
  getExpectedAddress,
  topup,
  deployFactory,
  deployDAOFromFactory,
  getFactory,
  getAllDAOs,
  getAddressForRoot,
  transferOwnership,
  //setSettingsChanges,
}

export default daoService
