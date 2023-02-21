import { Keypair } from '@solana/web3.js';
import { readFile } from 'fs/promises';

const t = (
  await import('./wallet.json', {
    assert: { type: 'json' }
  })
).default;
// solana address -k wallet.json
export const WALLET_KEYPAIR = Keypair.fromSecretKey(new Uint8Array(t));

const file = await readFile('./package.json', 'utf8');
export const pkg = JSON.parse(file);

export function getUri(path) {
  return `http://localhost:3001/${path}`;
}
