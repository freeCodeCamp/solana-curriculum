import {
  ChangeEvent,
  FormEvent,
  MouseEventHandler,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import { IDL, Todo } from '../../target/types/todo';
import './app.css';
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { Connection, PublicKey } from '@solana/web3.js';
import { Buffer } from 'buffer';
import {
  isWalletConnected,
  Task,
  Filters,
  FILTER_MAP,
  usePrevious,
  FILTER_NAMES,
  TodoT,
  FormT,
  FilterButtonT
} from './utils';

window.Buffer = Buffer;

const PROGRAM_ID = new PublicKey(
  import.meta.env.VITE_PROGRAM_ID ||
    '9a43FDYE3S98dfN1rPAeavJT6MzBUEuF3bdX94zihQG2'
);
const ENDPOINT =
  import.meta.env.VITE_SOLANA_CONNECTION_URL || 'http://localhost:8899';
const connection = new Connection(ENDPOINT, 'confirmed');
const wallet = new PhantomWalletAdapter();
const ProgramContext = createContext<Program<Todo> | null>(null);

export function App() {
  const [program, setProgram] = useState<Program<Todo> | null>(null);

  const connectWallet: MouseEventHandler<HTMLButtonElement> = async e => {
    e.preventDefault();
    await wallet.connect();
    console.log('Connected to: ', wallet.publicKey);
    if (isWalletConnected(wallet)) {
      const provider = new AnchorProvider(connection, wallet, {});
      const program = new Program(IDL, PROGRAM_ID, provider);
      setProgram(program);
    }
  };

  return (
    <ProgramContext.Provider value={program}>
      {program ? <Landing /> : <LogIn connectWallet={connectWallet} />}
    </ProgramContext.Provider>
  );
}

function LogIn({
  connectWallet
}: {
  connectWallet: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <div className='todoapp stack-large'>
      <h1>Connect and Login</h1>
      <button onClick={connectWallet} className='btn'>
        Connect Wallet
      </button>
    </div>
  );
}

function Landing() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filters>('All');
  const program = useContext(ProgramContext);

  async function loadTasksFromChain() {
    if (program && program.provider.publicKey) {
      const [tasksPublicKey, _] = PublicKey.findProgramAddressSync(
        [program.provider.publicKey.toBuffer()],
        PROGRAM_ID
      );
      try {
        const tasks = await program.account.tasksAccount.fetch(tasksPublicKey);
        setTasks(tasks.tasks);
      } catch (e) {
        console.warn(
          'Your account does not yet exist. Save your ToDos to Solana to create an account.',
          e
        );
      }
    }
  }

  useEffect(() => {
    loadTasksFromChain();
  }, []);

  function toggleTaskCompleted(id: number) {
    const updatedTasks = tasks.map(task => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id: number) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id: number, newName: string) {
    const editedTaskList = tasks.map(task => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  function addTask(name: string) {
    const id = Math.floor(Math.random() * 1_000_000);
    const newTask = { id, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  async function saveTasksToChain() {
    if (program && program.provider.publicKey) {
      const [tasksPublicKey, _] = PublicKey.findProgramAddressSync(
        [program.provider.publicKey.toBuffer()],
        PROGRAM_ID
      );
      await program.methods
        .saveTasks(tasks)
        .accounts({
          tasks: tasksPublicKey
        })
        .rpc();
    }
  }

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map(task => (
      <TodoC
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  const listHeadingRef = useRef<HTMLHeadingElement>(null);
  const prevTaskLength = usePrevious(tasks.length) ?? 0;

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef?.current?.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <div className='todoapp stack-large'>
      <h1>ToDos</h1>
      <Form addTask={addTask} />
      <div className='filters btn-group stack-exception'>
        {FILTER_NAMES.map(name => (
          <FilterButton
            key={name}
            name={name}
            isPressed={name === filter}
            setFilter={setFilter}
          />
        ))}
      </div>
      <button className='btn' onClick={saveTasksToChain}>
        Save to Chain
      </button>
      <h2 id='list-heading' ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul
        role='list'
        className='todo-list stack-large stack-exception'
        aria-labelledby='list-heading'
      >
        {taskList}
      </ul>
    </div>
  );
}

function TodoC({
  name,
  id,
  editTask,
  toggleTaskCompleted,
  deleteTask,
  completed
}: TodoT) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');

  const editFieldRef = useRef<HTMLInputElement>(null);
  const editButtonRef = useRef<HTMLButtonElement>(null);

  const wasEditing = usePrevious(isEditing);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setNewName(e.target.value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newName.trim()) {
      return;
    }
    editTask(id, newName);
    setNewName('');
    setEditing(false);
  }

  const editingTemplate = (
    <form className='stack-small' onSubmit={handleSubmit}>
      <div className='form-group'>
        <label className='todo-label' htmlFor={id.toString()}>
          New name for {name}
        </label>
        <input
          id={id.toString()}
          className='todo-text'
          type='text'
          value={newName || name}
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div className='btn-group'>
        <button
          type='button'
          className='btn todo-cancel'
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className='visually-hidden'>renaming {name}</span>
        </button>
        <button type='submit' className='btn btn__primary todo-edit'>
          Save
          <span className='visually-hidden'>new name for {name}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className='stack-small'>
      <div className='c-cb'>
        <input
          id={id.toString()}
          type='checkbox'
          defaultChecked={completed}
          onChange={() => toggleTaskCompleted(id)}
        />
        <label className='todo-label' htmlFor={id.toString()}>
          {name}
        </label>
      </div>
      <div className='btn-group'>
        <button
          type='button'
          className='btn'
          onClick={() => setEditing(true)}
          ref={editButtonRef}
        >
          Edit <span className='visually-hidden'>{name}</span>
        </button>
        <button
          type='button'
          className='btn btn__danger'
          onClick={() => deleteTask(id)}
        >
          Delete <span className='visually-hidden'>{name}</span>
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef?.current?.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef?.current?.focus();
    }
  }, [wasEditing, isEditing]);

  return <li className='todo'>{isEditing ? editingTemplate : viewTemplate}</li>;
}

function Form({ addTask }: FormT) {
  const [name, setName] = useState('');
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name) return;
    addTask(name);
    setName('');
  }
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2 className='label-wrapper'>
        <label htmlFor='new-todo-input' className='label__lg'>
          What todo?
        </label>
      </h2>
      <input
        type='text'
        id='new-todo-input'
        className='input input__lg'
        name='text'
        autoComplete='off'
        value={name}
        onChange={handleChange}
      />
      <button type='submit' className='btn btn__primary btn__lg'>
        Add
      </button>
    </form>
  );
}

function FilterButton({ name, isPressed, setFilter }: FilterButtonT) {
  return (
    <button
      type='button'
      className='btn toggle-btn'
      aria-pressed={isPressed}
      onClick={() => setFilter(name)}
    >
      <span className='visually-hidden'>Show </span>
      <span>{name}</span>
      <span className='visually-hidden'> tasks</span>
    </button>
  );
}
