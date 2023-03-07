import { MintNftOutput } from '@metaplex-foundation/js';
import { Account, createMint } from '@solana/spl-token';
import { AccountInfo, Signer } from '@solana/web3.js';

declare function createMintAccount({
  payer
}: {
  payer: Signer;
}): ReturnType<typeof createMint>;

declare function getMintAccounts(): Promise<AccountInfo[]>; // TODO

declare function createTokenAccount(): Promise<Account>; // TODO

declare function mintToken(): Promise<MintNftOutput>; // TODO
