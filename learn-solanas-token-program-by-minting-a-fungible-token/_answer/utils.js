import { PublicKey, Keypair } from '@solana/web3.js';

const secretKey = (
  await import('./wallet.json', {
    assert: { type: 'json' }
  })
).default;

export const payer = Keypair.fromSecretKey(new Uint8Array(secretKey));

const MINT_ADDRESS_58 = 'FQYH2siZne5bpjfGVLdHkTtZ61zApKnVA4iw295qrh4L';
// For simplicity, the mint authority is the payer.
const MINT_AUTHORITY_58 = payer.publicKey.toBase58();
const TOKEN_ACCOUNT_58 = '8pbgZXnoXBmV5FB6disLcQqPy5SSzfNmQiQJwJzxo8gt';

export const mintAddress = new PublicKey(MINT_ADDRESS_58);
export const mintAuthority = new PublicKey(MINT_AUTHORITY_58);
export const tokenAccount = new PublicKey(TOKEN_ACCOUNT_58);
