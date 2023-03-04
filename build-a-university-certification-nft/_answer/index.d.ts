import { createMint } from '@solana/spl-token';
import { Signer } from '@solana/web3.js';

declare function createMintAccount({
  payer
}: {
  payer: Signer;
}): ReturnType<typeof createMint>;
