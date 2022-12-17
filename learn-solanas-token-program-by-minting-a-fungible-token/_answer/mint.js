import { mintTo } from "@solana/spl-token";
import { Connection } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const payer = ;
const mint = ;
const tokenAccount = ;
const mintAuthority = ;

await mintTo(
  connection,
  payer,
  mint,
  tokenAccount.address,
  mintAuthority,
  100000000000 // Has to do with the decimals of the mint
);
