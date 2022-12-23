import { readFile } from 'fs/promises';
import { Keypair, PublicKey } from '@solana/web3.js';

export async function getPayer() {
  const secretKeyString = await readFile('wallet.json', 'utf8');
  const secretKey = JSON.parse(secretKeyString);
  const int8secretKey = new Uint8Array(secretKey);
  return Keypair.fromSecretKey(int8secretKey);
}

export const mintAddress = new PublicKey(
  '98NDWqjUTudLQY2kbiEcH8ZWRH8RpHiqkEHUU3CsHJdq'
);
export const mintAuthority = new PublicKey(
  '8xGFqaD9UfbUptdaWTgxA1EgBqhqyie3CUtQSLgSuEZv'
);
export const tokenAccount = new PublicKey(
  'AaavdjLrfqUBuVpgu24ofEfgMNV3cgMjsrauogEbfE2o'
);
