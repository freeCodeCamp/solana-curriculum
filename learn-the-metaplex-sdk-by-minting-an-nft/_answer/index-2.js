import { Connection, Keypair } from '@solana/web3.js';
import { readFile } from 'fs/promises';
import {
  keypairIdentity,
  Metaplex,
  mockStorage,
  toMetaplexFile
} from '@metaplex-foundation/js';

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

const imageUri = getUri('fcc_primary_small.svg');

const { uri } = await metaplex.nfts().uploadMetadata({
  name: 'fCC',
  description: 'My fCC nft',
  image: imageUri
});

console.log('Metadata URI:', uri);

const res = await metaplex.nfts().create({
  name: 'fCC',
  uri,
  sellerFeeBasisPoints: 1000,
  maxSupply: 1,
  symbol: 'FCC'
});

console.log(res);

function getUri(path) {
  return `http://localhost:3001/assets/${path}`;
}
