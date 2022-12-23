import { getMint } from '@solana/spl-token';
import { Connection } from '@solana/web3.js';
import { mintAddress } from './utils.js';

const connection = new Connection('http://localhost:8899', 'confirmed');

const mint = await getMint(connection, mintAddress);

console.log('Mint Supply:', mint.supply);
