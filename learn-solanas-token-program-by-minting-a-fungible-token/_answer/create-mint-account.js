import { createMint } from '@solana/spl-token';
import { payer } from './utils.js';
import { Connection } from '@solana/web3.js';

const connection = new Connection('http://localhost:8899');

const mintAuthority = payer.publicKey;
const freezeAuthority = payer.publicKey;

const mint = await createMint(
  connection,
  payer,
  mintAuthority,
  freezeAuthority,
  9
);

console.log('Token Unique Identifier:', mint.toBase58());

// const mintInfo = await getMint(connection, mint);

// console.log(mintInfo);
