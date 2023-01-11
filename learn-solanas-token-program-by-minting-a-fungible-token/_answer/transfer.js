import {
  getAssociatedTokenAddress,
  getOrCreateAssociatedTokenAccount,
  transfer
} from '@solana/spl-token';
import { Connection, Keypair } from '@solana/web3.js';
import { payer, mintAddress } from './utils.js';

const connection = new Connection('http://localhost:8899', 'confirmed');
const fromWallet = payer;
const fromPublicKey = fromWallet.publicKey;

const fromTokenAccount = await getAssociatedTokenAddress(
  mintAddress,
  fromPublicKey
);

const toWallet = Keypair.generate();

// Get the token account of the toWallet address, and if it does not exist, create it
const toTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  fromWallet,
  mintAddress,
  toWallet.publicKey
);

const amount = 50;

// Transfer the new token to `toTokenAccount`
await transfer(
  connection,
  fromWallet,
  fromTokenAccount,
  toTokenAccount.address,
  fromWallet,
  amount
);

console.log(`Transfered ${amount} tokens to ${toWallet.publicKey.toBase58()}`);
