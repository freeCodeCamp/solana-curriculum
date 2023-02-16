import { Connection, PublicKey } from '@solana/web3.js';
import { getAssociatedTokenAddress, getAccount } from '@solana/spl-token';
import { mintAddress } from './utils.js';

const connection = new Connection('http://localhost:8899');

const userPublicKey = new PublicKey(process.argv[2]);

const tokenAddress = await getAssociatedTokenAddress(
  mintAddress,
  userPublicKey
);

const tokenAccount = await getAccount(connection, tokenAddress);

console.log('Token Account:', tokenAccount);
