import { Connection } from '@solana/web3.js';
import { getMint } from '@solana/spl-token';
import { mintAddress } from './utils.js';

const connection = new Connection('http://localhost:8899');

const mint = await getMint(connection, mintAddress);

console.log(mint);
