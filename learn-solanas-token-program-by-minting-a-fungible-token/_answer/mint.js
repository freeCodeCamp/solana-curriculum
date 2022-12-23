import { mintTo } from '@solana/spl-token';
import { Connection } from '@solana/web3.js';
import { getPayer, mintAddress, mintAuthority, tokenAccount } from './utils.js';

const connection = new Connection('http://localhost:8899', 'confirmed');

const payer = await getPayer();

await mintTo(
  connection,
  payer,
  mintAddress,
  tokenAccount,
  mintAuthority,
  100_000_000_000
);
