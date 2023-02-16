import { readFile } from 'fs/promises';
import { PublicKey, Keypair } from '@solana/web3.js';

const secretKey = (
  await import('./wallet.json', {
    assert: { type: 'json' }
  })
).default;

export const payer = Keypair.fromSecretKey(new Uint8Array(secretKey));

const MINT_ADDRESS_58 = (await readPackageJson()).env.MINT_ADDRESS;
// For simplicity, the mint authority is the payer.
const MINT_AUTHORITY_58 = payer.publicKey.toBase58();
const TOKEN_ACCOUNT_58 = (await readPackageJson()).env.TOKEN_ADDRESS;

export const mintAddress = new PublicKey(MINT_ADDRESS_58);
export const mintAuthority = new PublicKey(MINT_AUTHORITY_58);
export const tokenAccount = new PublicKey(TOKEN_ACCOUNT_58);

async function readPackageJson() {
  const file = await readFile('../package.json', 'utf8');
  return JSON.parse(file);
}

// async function writePackageJson(json) {
//   const original = await readPackageJson();
//   const updated = { ...original, ...json };
//   const file = JSON.stringify(updated, null, 2);
//   await writeFile('../package.json', file, 'utf8');
// }
