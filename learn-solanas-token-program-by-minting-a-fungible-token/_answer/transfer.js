import {
  getAccount,
  getOrCreateAssociatedTokenAccount,
  transfer
} from '@solana/spl-token';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { payer, mintPublicKey } from './utils.js';

const connection = new Connection('http://localhost:8899', 'confirmed');

const fromTokenAccountPublicKey = new PublicKey(process.argv[2]);

// Generate a random new wallet to transfer to
const toWallet = Keypair.generate();

// Get the token account of the toWallet address, and if it does not exist, create it
const toTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  payer,
  mintPublicKey,
  toWallet.publicKey
);

const fromWallet = await getAccount(connection, fromTokenAccountPublicKey);

const owner = fromWallet.owner;

const amount = Number(process.argv[3]);

// Transfer the new token to `toTokenAccount`
await transfer(
  connection,
  payer,
  fromTokenAccountPublicKey,
  toTokenAccount.address,
  owner,
  amount
);

console.log(`Transfered ${amount} tokens to ${toWallet.publicKey.toBase58()}`);
