// Program owner of mint is different for SPL-Token and Metaplex.

import { Metaplex } from '@metaplex-foundation/js';
import {
  AuthorityType,
  createMint,
  getMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  setAuthority,
  TOKEN_PROGRAM_ID
} from '@solana/spl-token';
import { Connection, Keypair } from '@solana/web3.js';
import { createMintAccount } from './index.js';

const payer = Keypair.generate();
console.log('Payer: ', payer.publicKey.toBase58());

const connection = new Connection('http://127.0.0.1:8899');

async function airdrop() {
  const airdropSignature = await connection.requestAirdrop(
    payer.publicKey,
    1000000000
  );
  // Confirm transaction
  await connection.confirmTransaction(airdropSignature);
}

await airdrop();

const mint = await createMintAccount({ payer });

console.log('Mint: ', mint);
const mintAccounts = await connection.getParsedProgramAccounts(
  TOKEN_PROGRAM_ID,
  {
    filters: [
      {
        dataSize: 82
      },
      {
        memcmp: {
          offset: 4,
          bytes: payer.publicKey.toBase58()
        }
      }
    ]
  }
);

console.log('Mint accounts: ', JSON.stringify(mintAccounts));
