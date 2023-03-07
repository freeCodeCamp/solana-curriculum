import { useEffect, useRef, useState } from 'react';
import { Keypair, Signer } from '@solana/web3.js';
import {
  createMintAccount as camperCreateMintAccount,
  getMintAccounts as camperGetMintAccounts,
  createTokenAccount as camperCreateTokenAccount,
  mintToken as camperMintToken
} from '../../index.js';
import './app.css';

// 1) Create a certificate program - create a new mint
// 2) Register new student - create a token account for the student
// 3) Issue a certificate - mint NFT to the student's token account
// 4) View a certificate - view the certificate's metadata
export function App() {
  const [output, setOutput] = useState<string>('OUTPUT');
  const createMintAccount: CreateMintAccountF = async ({ payer }) => {
    if (payer) {
      const mint = await camperCreateMintAccount({ payer });
      setOutput(JSON.stringify(mint, null, 2));
    }
  };
  const getMintAccounts: GetMintAccountsF = async () => {
    await camperGetMintAccounts();
  };
  const createTokenAccount: CreateTokenAccountF = async () => {
    await camperCreateTokenAccount();
  };
  const mintToken: MintTokenF = async () => {
    await camperMintToken();
  };

  return (
    <main>
      <h1>Solana University Certification Dashboard</h1>
      <div className='controls'>
        <CreateCertificateProgram {...{ createMintAccount }} />
        <GetCertificatePrograms {...{ getMintAccounts }} />
        <RegisterStudent {...{ createTokenAccount }} />
        <GrantCertificate {...{ mintToken }} />
      </div>
      <Output {...{ output }} />
    </main>
  );
}

type OutputT = {
  output: string;
};

type CreateMintAccountF = ({ payer }: { payer?: Signer }) => Promise<void>;
type GetMintAccountsF = () => Promise<void>;
type CreateTokenAccountF = () => Promise<void>;
type MintTokenF = () => Promise<void>;

type CreateCertificateProgramT = {
  createMintAccount: CreateMintAccountF;
};

/**
 * Create a new Mint for a certificate program
 */
function CreateCertificateProgram({
  createMintAccount
}: CreateCertificateProgramT) {
  const [payer, setPayer] = useState<Signer>();
  const authority = useRef<HTMLInputElement>(null);

  function setAuthority() {
    if (authority.current) {
      try {
        const keypair = Keypair.fromSecretKey(
          JSON.parse(authority.current.value)
        );
        setPayer(keypair);
      } catch (e) {
        console.error(e);
      }
    }
  }

  useEffect(setAuthority, [authority]);

  return (
    <section>
      <p>Create Certificate Program</p>
      <label>
        Authority: <input type='text' id='authority' ref={authority} />
      </label>
      <button onClick={() => createMintAccount({ payer })}>
        Create Mint Account
      </button>
    </section>
  );
}

/**
 * Get all mitns. Useful to get the mint address for a certificate program
 */
function GetCertificatePrograms({
  getMintAccounts
}: {
  getMintAccounts: GetMintAccountsF;
}) {
  return (
    <section>
      <p>Get Certificate Programs</p>
      <button onClick={() => getMintAccounts()}>Get Mint Accounts</button>
    </section>
  );
}

/**
 * Create a new token account associated with the public key of the student
 */
function RegisterStudent({
  createTokenAccount
}: {
  createTokenAccount: CreateTokenAccountF;
}) {
  return (
    <section>
      <p>Register Student</p>
      <button onClick={() => createTokenAccount()}>Create Token Account</button>
    </section>
  );
}

/**
 * Mint a new NFT to the student's token account
 */
function GrantCertificate({ mintToken }: { mintToken: MintTokenF }) {
  return (
    <section>
      <p>Grant Certificate</p>
      <button onClick={() => mintToken()}>Mint Token</button>
    </section>
  );
}

type DisplayPngT = {
  buffer: Buffer;
};

function DisplayPng({ buffer }: DisplayPngT) {
  return <img src={`data:image/png;base64,${buffer.toString('base64')}`}></img>;
}

function Output({ output }: OutputT) {
  return (
    <div>
      <p>{output}</p>
    </div>
  );
}
