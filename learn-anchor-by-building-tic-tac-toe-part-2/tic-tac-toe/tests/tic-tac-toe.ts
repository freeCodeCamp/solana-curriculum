import {
  AnchorProvider,
  workspace,
  setProvider,
  Program
} from '@coral-xyz/anchor';
import { TicTacToe } from '../target/types/tic_tac_toe';

describe('TicTacToe', () => {
  // Configure the client to use the local cluster.
  setProvider(AnchorProvider.env());

  const program = workspace.TicTacToe as Program<TicTacToe>;

  it('Is initialized!', async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log('Your transaction signature', tx);
  });
});
