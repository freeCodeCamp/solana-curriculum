import { Connection, Keypair } from '@solana/web3.js';
import { readFile } from 'fs/promises';
import {
  bundlrStorage,
  keypairIdentity,
  Metaplex,
  mockStorage,
  toMetaplexFile
} from '@metaplex-foundation/js';

// import Arweave from 'arweave';

const connection = new Connection('http://127.0.0.1:8899');

// const arweave = Arweave.init({
//   host: 'localhost',
//   port: 3001,
//   protocol: 'http'
// });

const t = (
  await import('./wallet.json', {
    assert: { type: 'json' }
  })
).default;
// solana address -k wallet.json
const WALLET_KEYPAIR = Keypair.fromSecretKey(new Uint8Array(t));

// const WALLET_PUBKEY = WALLET_KEYPAIR.publicKey;

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

// ------------------------------

// 1. Upload image to Arweave
// const buffer = await readFile('../assets/fcc_primary_small.svg');

// const transaction = await arweave.createTransaction({
//   data: buffer
// });

// transaction.addTag('Content-Type', 'image/svg');

// const arWallet = await arweave.wallets.generate();

// await arweave.transactions.sign(transaction, arWallet);

// const response = await arweave.transactions.post(transaction);
// console.log('RESPONSE: ', response);

// const id = transaction.id;
// const uri = id ? `http://localhost:3001/${id}` : undefined;
// console.log('URI: ', uri);
// // 2. Upload metadata to Arweave

// const metadataRequest = JSON.stringify(response.data);

// const metadataTransaction = await arweave.createTransaction({
//   data: metadataRequest
// });

// metadataTransaction.addTag('Content-Type', 'application/json');

// await arweave.transactions.sign(metadataTransaction, arWallet);

// await arweave.transactions.post(metadataTransaction);

const n = await metaplex.nfts().create({
  name: 'fCC',
  uri,
  sellerFeeBasisPoints: 1000,
  maxSupply: 1,
  symbol: 'FCC'
  // tokenOwner: WALLET_PUBKEY
});

console.log(n);
