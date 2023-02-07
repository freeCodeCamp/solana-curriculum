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

const buffer = await readFile('../assets/fcc_primary_small.svg');

// buffer to metaplex file
const file = toMetaplexFile(buffer, 'fcc_primary_small.svg');

console.log('Uploading file...');

// upload image and get image uri
const imageUri = await metaplex.storage().upload(file);

console.log('Image URI:', imageUri);

// upload metadata and get metadata uri (off chain metadata)
const { uri } = await metaplex.nfts().uploadMetadata({
  name: 'fCC',
  description: 'My fCC nft',
  image: imageUri
});

console.log('Metadata URI:', uri);

const n = await metaplex.nfts().create({
  name: 'fCC',
  uri,
  sellerFeeBasisPoints: 1000,
  maxSupply: 1,
  symbol: 'FCC'
});

console.log(n);
