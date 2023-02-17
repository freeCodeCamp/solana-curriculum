import { Metaplex, keypairIdentity } from '@metaplex-foundation/js';
import { Connection, clusterApiUrl, Keypair, PublicKey } from '@solana/web3.js';

const connection = new Connection(clusterApiUrl('mainnet-beta'));
// const keypair = Keypair.generate();

const metaplex = new Metaplex(connection);
// metaplex.use(keypairIdentity(keypair));

const mintAddress = new PublicKey(
  'Ay1U9DWphDgc7hq58Yj1yHabt91zTzvV2YJbAWkPNbaK'
);

const nft = await metaplex.nfts().findByMint({ mintAddress });

console.log(nft);
