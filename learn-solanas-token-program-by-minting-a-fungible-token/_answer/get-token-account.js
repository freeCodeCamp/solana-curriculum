import { getAccount, getAssociatedTokenAddress } from '@solana/spl-token';
import { Connection, PublicKey } from '@solana/web3.js';
import { mintAddress } from './utils.js';

const connection = new Connection('http://localhost:8899', 'confirmed');

const userPublicKey = new PublicKey(process.argv[2]);

const tokenAccount = await getAssociatedTokenAddress(
  mintAddress,
  userPublicKey
);

const account = await getAccount(connection, tokenAccount);

console.log('Token Account: ', account);
