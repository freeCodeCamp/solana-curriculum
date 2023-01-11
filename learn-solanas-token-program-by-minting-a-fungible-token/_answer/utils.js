import { PublicKey, Keypair } from '@solana/web3.js';

const t = (
  await import('./wallet.json', {
    assert: { type: 'json' }
  })
).default;
// solana address -k wallet.json
export const payer = Keypair.fromSecretKey(new Uint8Array(t));

// new PublicKey(
//   '8xGFqaD9UfbUptdaWTgxA1EgBqhqyie3CUtQSLgSuEZv'
// );

// AUpi7fPGDW1Dhp5Uk6iRmXEK3Li2LFJztnQrjrGbnboU
export const mintAddress = new PublicKey(
  'AUpi7fPGDW1Dhp5Uk6iRmXEK3Li2LFJztnQrjrGbnboU'
);
export const mintAuthority = new PublicKey(
  '8xGFqaD9UfbUptdaWTgxA1EgBqhqyie3CUtQSLgSuEZv'
);
export const tokenAccount = new PublicKey(
  'Fg5tPKcgb3Nnfbgg2bLT7tAr7tHMDVimJuTn36Fg1tYT'
);
