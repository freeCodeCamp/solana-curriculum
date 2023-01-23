import { mintTo } from '@solana/spl-token';
import { Connection } from '@solana/web3.js';
import {
  payer,
  mintPublicKey,
  mintAuthorityPublicKey,
  tokenAccountPublicKey
} from './utils.js';

const connection = new Connection('http://localhost:8899');

await mintTo(
  connection,
  payer,
  mintPublicKey,
  tokenAccountPublicKey,
  mintAuthorityPublicKey,
  1_000_000_000
);
