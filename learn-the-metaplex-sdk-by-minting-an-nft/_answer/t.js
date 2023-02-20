import { Metaplex, keypairIdentity } from '@metaplex-foundation/js';
import { Connection, clusterApiUrl, Keypair, PublicKey } from '@solana/web3.js';
import { pkg } from '../utils.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

// const connection = new Connection(clusterApiUrl('mainnet-beta'));
const connection = new Connection('http://127.0.0.1:8899');
// const keypair = Keypair.generate();

const metaplex = new Metaplex(connection);
// metaplex.use(keypairIdentity(keypair));

// const mintAddress = new PublicKey(
//   'Ay1U9DWphDgc7hq58Yj1yHabt91zTzvV2YJbAWkPNbaK'
// );

// const nft = await metaplex.nfts().findByMint({ mintAddress });

const owner = new PublicKey(pkg.env.WALLET_ADDRESS);
// const a = await metaplex.nfts().findAllByOwner({
//   owner
// });

console.log(owner.toBase58());
const mintaccounts = await connection.getParsedProgramAccounts(
  TOKEN_PROGRAM_ID,
  {
    filters: [
      {
        dataSize: 165 // number of bytes
      },
      {
        memcmp: {
          offset: 32, // number of bytes
          bytes: owner.toBase58() // base58 encoded string
        }
      }
    ]
  }
);

console.log(JSON.stringify(mintaccounts, null, 2));
