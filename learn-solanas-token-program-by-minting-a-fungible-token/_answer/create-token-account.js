import {
  getAccount,
  getMint,
  getOrCreateAssociatedTokenAccount
} from '@solana/spl-token';
import { Connection } from '@solana/web3.js';
import { payer, mintPublicKey } from './utils.js';

const connection = new Connection('http://localhost:8899', 'confirmed');

// const mint = await getMint(connection, mintAddress);

// console.log('mint:', mint);

const tokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  payer,
  // mint.address,
  mintPublicKey,
  payer.publicKey
);

console.log('Token Account Address:', tokenAccount.address.toBase58());

// const tokenAccountInfo = await getAccount(connection, tokenAccount.address);

// console.log(tokenAccountInfo.amount);
