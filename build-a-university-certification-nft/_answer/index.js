import { Metaplex, TokenStandard } from '@metaplex-foundation/js';
import {
  createMint,
  getOrCreateAssociatedTokenAccount
} from '@solana/spl-token';
import { Connection } from '@solana/web3.js';

const connection = new Connection('http://127.0.0.1:8899');

const metaplex = Metaplex.make(connection);

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

export async function mintToken({ mintAddress, ownerAddress }) {
  const nft = await metaplex.nfts().mint({
    nftOrSft: {
      address: mintAddress,
      tokenStandard: TokenStandard.NonFungible
    },
    toOwner: ownerAddress
  });
  return nft;
}
