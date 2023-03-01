import { getOrCreateAssociatedTokenAccount } from '@solana/spl-token';
import { Connection } from '@solana/web3.js';
import { payer, mintAddress } from './utils.js';

const connection = new Connection('http://127.0.0.1:8899');

const tokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  payer,
  mintAddress,
  payer.publicKey
);

console.log('Token Account Address:', tokenAccount.address.toBase58());
