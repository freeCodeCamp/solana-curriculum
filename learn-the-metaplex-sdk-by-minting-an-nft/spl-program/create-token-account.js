import { Connection } from '@solana/web3.js';
import { payer, mintAddress } from './utils.js';

const connection = new Connection('http://localhost:8899');

const tokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  payer,
  mintAddress,
  payer.publicKey
);

console.log('Token Account Address:', tokenAccount.publicKey.toBase58());
