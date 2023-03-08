import { useEffect, useRef, useState } from 'react';
import { Keypair, PublicKey, Signer } from '@solana/web3.js';
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
  const [payer, setPayer] = useState<Signer>();
  const [mintAddress, setMintAddress] = useState<PublicKey>();
  const [ownerAddress, setOwnerAddress] = useState<PublicKey>();
  const [invalidInputs, setInvalidInputs] = useState<string[]>([]);

  const createMintAccount: CreateMintAccountF = async () => {
    if (!payer) {
      setInvalidInputs(['payer']);
      return;
    }
    setInvalidInputs([]);
    const mint = await camperCreateMintAccount({ payer });
    setOutput(JSON.stringify(mint, null, 2));
  };
  const getMintAccounts: GetMintAccountsF = async () => {
    if (!payer) {
      setInvalidInputs(['payer']);
      return;
    }
    setInvalidInputs([]);
    await camperGetMintAccounts({ payer });
  };
  const createTokenAccount: CreateTokenAccountF = async () => {
    if (!payer || !mintAddress || !ownerAddress) {
      setInvalidInputs(['payer', 'mintAddress', 'ownerAddress']);
      return;
    }
    setInvalidInputs([]);
    await camperCreateTokenAccount({ payer, mintAddress, ownerAddress });
  };
  const mintToken: MintTokenF = async () => {
    if (!mintAddress || !ownerAddress) {
      setInvalidInputs(['mintAddress', 'ownerAddress']);
      return;
    }
    setInvalidInputs([]);
    await camperMintToken({ mintAddress, ownerAddress });
  };

  const authorityInput = useRef<HTMLInputElement>(null);
  const mintInput = useRef<HTMLInputElement>(null);
  const ownerInput = useRef<HTMLInputElement>(null);

  function setAuthority() {
    if (authorityInput.current) {
      try {
        const keypair = Keypair.fromSecretKey(
          JSON.parse(authorityInput.current.value)
        );
        setPayer(keypair);
      } catch (e) {
        console.error(e);
      }
    }
  }

  function setMint() {
    if (mintInput.current) {
      try {
        const mint = new PublicKey(mintInput.current.value);
        setMintAddress(mint);
      } catch (e) {
        console.error(e);
      }
    }
  }

  function setOwner() {
    if (ownerInput.current) {
      try {
        const owner = new PublicKey(ownerInput.current.value);
        setOwnerAddress(owner);
      } catch (e) {
        console.error(e);
      }
    }
  }

  useEffect(setAuthority, [authorityInput]);
  useEffect(setMint, [mintInput]);
  useEffect(setOwner, [ownerInput]);

  return (
    <main>
      <h1>Solana University Certification Dashboard</h1>
      <form>
        <label>
          Payer Secret Key:{' '}
          <input type='text' id='authority' ref={authorityInput}></input>
        </label>
        <label>
          Mint Public Key: <input type='text' id='mint' ref={mintInput}></input>
        </label>
        <label>
          Student Public Key
          <input type='text' id='owner' ref={ownerInput}></input>
        </label>
      </form>
      <div className='controls'>
        <CreateCertificateProgram {...{ createMintAccount }} />
        <GetCertificatePrograms {...{ getMintAccounts }} />
        <RegisterStudent {...{ createTokenAccount }} />
        <GrantCertificate {...{ mintToken }} />
      </div>
      {invalidInputs.length && <ValidationError {...{ invalidInputs }} />}
    </main>
  );
}

type OutputT = {
  output: string;
};

type CreateMintAccountF = () => Promise<void>;
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
  return (
    <section>
      <p>Create Certificate Program</p>
      <button onClick={() => createMintAccount()}>Create Mint Account</button>
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

function ValidationError({ invalidInputs }: { invalidInputs: string[] }) {
  return (
    <div>
      <p>Form requires: {invalidInputs.join(', ')}</p>
    </div>
  );
}
