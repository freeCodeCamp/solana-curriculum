import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import {
  keypairIdentity,
  Metaplex,
  mockStorage
} from '@metaplex-foundation/js';
import { pkg } from '../utils.js';

const connection = new Connection('http://127.0.0.1:8899');

const t = (
  await import('./wallet.json', {
    assert: { type: 'json' }
  })
).default;
// solana address -k wallet.json
const WALLET_KEYPAIR = Keypair.fromSecretKey(new Uint8Array(t));

const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(WALLET_KEYPAIR))
  .use(mockStorage());

const mintAddress = new PublicKey(process.argv[2] || pkg.env.MINT_ADDRESS);
console.log('Getting NFT with mint address:', mintAddress.toBase58());

const nft = await metaplex.nfts().findByMint({ mintAddress });

console.log(nft);
