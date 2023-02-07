const path = require('path');
const { LOCALHOST, tmpLedgerDir } = require('@metaplex-foundation/amman');

console.log('Deploy Path:', path.join(__dirname, '../mpl_token_metadata.so'));

module.exports = {
  validator: {
    killRunningValidators: true,
    programs: [
      {
        label: 'Token Metadata Program',
        programId: 'BLmWhFsPrYUzkJqfXojR3MMCXQ1v4ZCS98p8HopkqBsM',
        // programId: programIds.metadata,
        deployPath: path.join(__dirname, '../mpl_token_metadata.so')
        // deployPath: localDeployPath('mpl_token_metadata')
      }
    ],
    jsonRpcUrl: LOCALHOST,
    websocketUrl: '',
    commitment: 'confirmed',
    ledgerDir: tmpLedgerDir(),
    resetLedger: false,
    verifyFees: false,
    detached: process.env.CI != null,
    accountCluster: LOCALHOST,
    accounts: [
      {
        label: 'wallet',
        accountId: '3jXnpGMPLBQGBj6gxBtandgFHjz3VCRH5sYBfvehw8Fs'
      }
    ]
  },
  relay: {
    enabled: process.env.CI == null,
    killlRunningRelay: true
  },
  storage: {
    enabled: process.env.CI == null,
    storageId: 'mock-storage',
    clearOnStart: true
  }
};
