import { createMint, getMint } from '@solana/spl-token';
import { clusterApiUrl, Connection, Keypair } from '@solana/web3.js';

const payer = Keypair.generate();
const mintAuthority = Keypair.generate();
const freezeAuthority = Keypair.generate();

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

const mint = await createMint(
  connection,
  payer,
  mintAuthority.publicKey,
  freezeAuthority.publicKey,
  9 // Teach what this means, after learning what this means :sweat_smile:
);

console.log(mint.toBase58()); // Token unique identifier

const mintInfo = await getMint(connection, mint);

console.log(mintInfo.supply); // 0
