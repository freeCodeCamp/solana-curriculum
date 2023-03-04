import { createMint } from '@solana/spl-token';
import { Connection } from '@solana/web3.js';

const connection = new Connection('http://127.0.0.1:8899');

export async function createMintAccount({ payer }) {
  const mintAuthority = payer.publicKey;
  const freezeAuthority = payer.publicKey;
  const mint = await createMint(
    connection,
    payer,
    mintAuthority,
    freezeAuthority,
    0
  );
  return mint;
}
