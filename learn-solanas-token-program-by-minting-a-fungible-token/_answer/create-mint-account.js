import { createMint, getMint } from '@solana/spl-token';
import { payer, mintAuthority } from './utils.js';
import { Connection } from '@solana/web3.js';

const freezeAuthority = payer.publicKey;

const connection = new Connection('http://localhost:8899', 'confirmed');

const mint = await createMint(
  connection,
  payer,
  mintAuthority,
  freezeAuthority,
  9
);

console.log('Token Unique Identifier:', mint.toBase58());

const mintInfo = await getMint(connection, mint);

console.log(mintInfo.supply); // 0
