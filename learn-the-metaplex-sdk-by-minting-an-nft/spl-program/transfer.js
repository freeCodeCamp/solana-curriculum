import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import {
  getOrCreateAssociatedTokenAccount,
  getAccount,
  transfer
} from '@solana/spl-token';
import { payer, mintAddress } from './utils.js';

const connection = new Connection('http://localhost:8899');

const fromTokenAccountPublicKey = new PublicKey(process.argv[2]);

const toWallet = Keypair.generate();

const toTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  payer,
  mintAddress,
  toWallet.publicKey
);

const fromWallet = await getAccount(connection, fromTokenAccountPublicKey);

const owner = fromWallet.owner;

const amount = Number(process.argv[3]);

await transfer(
  connection,
  payer,
  fromTokenAccountPublicKey,
  toTokenAccount.address,
  owner,
  amount
);

console.log(
  `Transferred ${amount} tokens from ${fromTokenAccountPublicKey.toBase58()} to ${toTokenAccount.address.toBase58()}`
);
