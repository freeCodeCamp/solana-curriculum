import { MetaplexFile, MintNftOutput } from '@metaplex-foundation/js';
import { Account, createMint } from '@solana/spl-token';
import {
  AccountInfo,
  ParsedAccountData,
  PublicKey,
  Signer
} from '@solana/web3.js';

declare function uploadFile({
  metaplexFile,
  payer
}: {
  metaplexFile: MetaplexFile;
  payer: Signer;
}): Promise<string>;

declare function createMintAccount({
  payer
}: {
  payer: Signer;
}): ReturnType<typeof createMint>;

declare function getMintAccounts({
  payer
}: {
  payer: Signer;
}): Promise<AccountInfo<ParsedAccountData>[]>;

declare function createTokenAccount({
  payer,
  mintAddress,
  ownerAddress
}: {
  payer: Signer;
  mintAddress: PublicKey;
  ownerAddress: PublicKey;
}): Promise<Account>;

declare function mintToken({
  payer,
  mintAddress,
  ownerAddress,
  year,
  uri
}: {
  payer: Signer;
  mintAddress: PublicKey;
  ownerAddress: PublicKey;
  year: number;
  uri: string;
}): Promise<MintNftOutput>;

declare function getNFTs({
  ownerAddress
}: {
  ownerAddress: PublicKey;
}): Promise<MintNftOutput[]>;
