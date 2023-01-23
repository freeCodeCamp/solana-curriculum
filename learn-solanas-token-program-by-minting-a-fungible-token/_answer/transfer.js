import { getOrCreateAssociatedTokenAccount, transfer } from '@solana/spl-token';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { payer, mintPublicKey } from './utils.js';

const connection = new Connection('http://localhost:8899', 'confirmed');
const fromWallet = payer;

const fromTokenAccount = new PublicKey(process.argv[2]);

// Generate a random new wallet to transfer to
const toWallet = Keypair.generate();

// Get the token account of the toWallet address, and if it does not exist, create it
const toTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  payer,
  mintPublicKey,
  toWallet.publicKey
);

const amount = 50;

// Transfer the new token to `toTokenAccount`
await transfer(
  connection,
  payer,
  fromTokenAccount,
  toTokenAccount.address,
  fromWallet,
  amount
);

console.log(`Transfered ${amount} tokens to ${toWallet.publicKey.toBase58()}`);
