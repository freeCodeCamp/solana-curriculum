import { createMint, getMint } from '@solana/spl-token';
import { getPayer } from './utils.js';
import { clusterApiUrl, Connection, Keypair } from '@solana/web3.js';

const payer = await getPayer();

const mintAuthority = payer;
const freezeAuthority = payer;

const connection = new Connection('http://localhost:8899', 'confirmed');

const mint = await createMint(
  connection,
  payer,
  mintAuthority.publicKey,
  freezeAuthority.publicKey,
  9
);

console.log('Token Unique Identifier:', mint.toBase58());

const mintInfo = await getMint(connection, mint);

console.log(mintInfo.supply); // 0
