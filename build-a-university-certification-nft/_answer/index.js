import { Metaplex } from '@metaplex-foundation/js';
import {
  createMint,
  getAssociatedTokenAddress,
  getOrCreateAssociatedTokenAccount
} from '@solana/spl-token';
import { Connection, Keypair } from '@solana/web3.js';
import { localStorage } from './utils.js';

const connection = new Connection('http://127.0.0.1:8899');

const metaplex = Metaplex.make(connection).use(
  localStorage({ baseUrl: 'http://127.0.0.1:3001/' })
);

export async function uploadFile(metaplexFile) {
  const image = await metaplex.storage().upload(metaplexFile);
  const { uri } = await metaplex.nfts().uploadMetadata({
    name: 'fCC',
    description: 'An image of the freeCodeCamp logo',
    image
  });
  return uri;
}

export async function createMintAccount({ payer }) {
  const mintAuthority = payer.publicKey;
  const freezeAuthority = payer.publicKey;
  const mint = await createMint(
    connection,
    payer,
    mintAuthority,
    freezeAuthority,
    0
  );
  return mint;
}

export async function getMintAccounts({ payer }) {
  const mintAccounts = await connection.getParsedProgramAccounts(
    TOKEN_PROGRAM_ID,
    {
      filters: [
        {
          dataSize: 82
        },
        {
          memcmp: {
            offset: 4,
            bytes: payer.publicKey.toBase58()
          }
        }
      ]
    }
  );
  return mintAccounts;
}

export async function createTokenAccount({ payer, mintAddress, ownerAddress }) {
  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mintAddress,
    ownerAddress
  );
  return tokenAccount;
}

export async function mintToken({
  payer,
  mintAddress,
  ownerAddress,
  year,
  uri
}) {
  const tokenAddress = await getAssociatedTokenAddress(
    mintAddress,
    ownerAddress
  );

  const nft = await metaplex.nfts().create({
    useExistingMint: mintAddress,
    tokenOwner: ownerAddress,
    uri,
    name: `SOL-${year}`,
    sellerFeeBasisPoints: 0,
    maxSupply: 1,
    symbol: 'SOLU',
    isMutable: false,
    tokenAddress,
    updateAuthority: payer,
    mintAuthority: payer
  });

  return nft;
}
