import { Metaplex } from '@metaplex-foundation/js';
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

export async function getMintAccounts() {
  const mintAccounts = await connection.getParsedTokenAccountsByOwner(
    payer.publicKey,
    {
      programId: TOKEN_PROGRAM_ID
    }
  );
  return mintAccounts;
}

export async function createTokenAccount() {
  const tokenAccount = await getOrCreateAssociatedTokenAccount(connection);
  return tokenAccount;
}

export async function mintToken() {
  const nft = await metaplex.nfts().mint({ toOwner, toToken });
}
