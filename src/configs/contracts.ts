type TContracts = {
  [networkId: string | number]: {
    factory: string
  }
}

const contracts: TContracts = {
  1: {
    factory: '0x50dADaF6739754fafE0874B906F60688dB483855'
  }, // mainnet
  137: {
    factory: '0x50dADaF6739754fafE0874B906F60688dB483855'
  }, // polygon
  5: {
    factory: '0x50dADaF6739754fafE0874B906F60688dB483855'
  },
  80001: {
    factory: '0x50dADaF6739754fafE0874B906F60688dB483855'
  }, // mumbai
}

export default contracts