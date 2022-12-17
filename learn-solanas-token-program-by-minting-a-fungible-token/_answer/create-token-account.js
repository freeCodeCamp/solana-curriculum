import {
  getAccount,
  getOrCreateAssociatedTokenAccount
} from '@solana/spl-token';
import { Connection } from '@solana/web3.js';

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
const payer = ;
const mint = ;


const tokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  payer,
  mint,
  payer.publicKey
);

console.log(tokenAccount.address.toBase58());

const tokenAccountInfo = await getAccount(connection, tokenAccount.address);

console.log(tokenAccountInfo.amount);
