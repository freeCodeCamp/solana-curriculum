import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Keypair, PublicKey, Signer } from '@solana/web3.js';
import {
  createMintAccount as camperCreateMintAccount,
  getMintAccounts as camperGetMintAccounts,
  createTokenAccount as camperCreateTokenAccount,
  mintToken as camperMintToken,
  uploadFile as camperUploadFile
} from '../../index.js';
import './app.css';
import { toMetaplexFile } from '@metaplex-foundation/js';

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
    const mintAccounts = await camperGetMintAccounts({ payer });
    setOutput(JSON.stringify(mintAccounts, null, 2));
  };
  const createTokenAccount: CreateTokenAccountF = async () => {
    if (!payer || !mintAddress || !ownerAddress) {
      setInvalidInputs(['payer', 'mintAddress', 'ownerAddress']);
      return;
    }
    setInvalidInputs([]);
    const tokenAccount = await camperCreateTokenAccount({
      payer,
      mintAddress,
      ownerAddress
    });
    console.log(tokenAccount);
    setOutput(tokenAccount.address.toBase58());
  };
  const mintToken: MintTokenF = async () => {
    if (!payer || !mintAddress || !ownerAddress) {
      setInvalidInputs(['payer', 'mintAddress', 'ownerAddress']);
      return;
    }
    setInvalidInputs([]);
    const year = new Date().getFullYear();
    const uri = 'http://localhost:3002/meta/bsmDZxkbOP8GJlX1eHJp';
    const nft = await camperMintToken({
      payer,
      mintAddress,
      ownerAddress,
      year,
      uri
    });
    console.log(nft);
    setOutput(JSON.stringify(nft, null, 2));
  };

  const imageInput = useRef<HTMLInputElement>(null);
  const previewImg = useRef<HTMLImageElement>(null);

  function setAuthority(e: ChangeEvent<HTMLInputElement>) {
    if (e.target) {
      try {
        const keypair = Keypair.fromSecretKey(
          new Uint8Array(JSON.parse(e.target.value))
        );
        setPayer(keypair);
      } catch (e) {
        console.warn(e);
      }
    }
  }

  function setMint(e: ChangeEvent<HTMLInputElement>) {
    if (e.target) {
      try {
        const mint = new PublicKey(e.target.value);
        setMintAddress(mint);
      } catch (e) {
        console.warn(e);
      }
    }
  }

  function setOwner(e: ChangeEvent<HTMLInputElement>) {
    if (e.target) {
      try {
        const owner = new PublicKey(e.target.value);
        setOwnerAddress(owner);
      } catch (e) {
        console.warn(e);
      }
    }
  }

  async function uploadFile() {
    if (imageInput.current) {
      if (imageInput.current.files) {
        const file = imageInput.current.files[0];
        const arrayBuffer = await file.arrayBuffer();
        const metaplexFile = toMetaplexFile(arrayBuffer, file.name);
        if (!payer) {
          setInvalidInputs(['payer']);
          return;
        }
        setInvalidInputs([]);
        const uri = await camperUploadFile({ metaplexFile, payer });
        setOutput(uri);
      }
    }
  }

  return (
    <main>
      <h1>Solana University Certification Dashboard</h1>
      <form>
        <label>
          Payer Secret Key:{' '}
          <input type='text' id='authority' onChange={setAuthority}></input>
        </label>
        <label>
          Mint Public Key:{' '}
          <input type='text' id='mint' onChange={setMint}></input>
        </label>
        <label>
          Student Public Key:{' '}
          <input type='text' id='owner' onChange={setOwner}></input>
        </label>
      </form>
      <form>
        <label>
          Image File:{' '}
          <input
            type='file'
            id='image'
            accept='image/*'
            ref={imageInput}
            onChange={e => {
              if (e.target.files) {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = ev => {
                  if (ev.target) {
                    if (previewImg.current) {
                      previewImg.current.src = ev.target.result as string;
                    }
                  }
                  if (reader.result) {
                    console.log(reader.result);
                  }
                };
                reader.readAsDataURL(file);
              }
            }}
          ></input>
        </label>
        <img id='preview' alt='nft preview' ref={previewImg} />
        <button
          type='submit'
          onClick={e => {
            e.preventDefault();
            uploadFile();
          }}
        >
          Upload Image
        </button>
      </form>
      <div className='controls'>
        <CreateCertificateProgram {...{ createMintAccount }} />
        <GetCertificatePrograms {...{ getMintAccounts }} />
        <RegisterStudent {...{ createTokenAccount }} />
        <GrantCertificate {...{ mintToken }} />
      </div>
      {invalidInputs.length > 0 && <ValidationError {...{ invalidInputs }} />}
      <Output {...{ output }} />
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
      <pre style={{ textAlign: 'left' }}>
        <code>{output}</code>
      </pre>
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
