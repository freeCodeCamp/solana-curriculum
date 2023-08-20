import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { Todo } from '../target/types/todo';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';

describe('todo', () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Todo as Program<Todo>;
  const connection = new Connection('http://localhost:8899', 'confirmed');
  it('saves a new task', async () => {
    const user = Keypair.generate();

    const sig = await connection.requestAirdrop(user.publicKey, 10_000_000_000);
    await connection.confirmTransaction(sig);

    const [tasksPublicKey, _] = PublicKey.findProgramAddressSync(
      [user.publicKey.toBuffer()],
      program.programId
    );
    const _tx = await program.methods
      .saveTasks([
        {
          id: 1,
          name: 'example',
          completed: false
        }
      ])
      .accounts({ user: user.publicKey, tasks: tasksPublicKey })
      .signers([user])
      .rpc({ skipPreflight: true });
    const tasks = await program.account.tasksAccount.fetch(tasksPublicKey);

    console.log('tasks', tasks);
  });
});
