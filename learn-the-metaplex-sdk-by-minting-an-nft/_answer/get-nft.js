import { Connection, PublicKey } from '@solana/web3.js';
import { writeFile } from 'fs/promises';
import { keypairIdentity, Metaplex } from '@metaplex-foundation/js';
import { localStorage, pkg, WALLET_KEYPAIR } from './utils.js';

const connection = new Connection('http://127.0.0.1:8899');

const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(WALLET_KEYPAIR))
  .use(localStorage({ baseUrl: 'http://127.0.0.1:3001/' }));

const mintAddress = new PublicKey(
  process.argv[2] || pkg.env.MINT_ACCOUNT_ADDRESS
);

const nft = await metaplex.nfts().findByMint({ mintAddress });

console.log('NFT Metadata:', nft);

const imageData = await metaplex.storage().download(nft.json.image);

console.log('Image Data:', imageData);

await writeFile('download.png', imageData.buffer);
