import { useState } from 'react';
import './app.css';

// 1) Create a certificate program - create a new mint
// 2) Register new student - create a token account for the student
// 3) Issue a certificate - mint NFT to the student's token account
// 4) View a certificate - view the certificate's metadata
export function App() {
  const [output, setOutput] = useState<string>('OUTPUT');
  return (
    <main>
      <h1>Solana University Certification Dashboard</h1>
      <CreateCertificateProgram />
      <GetCertificatePrograms />
      <RegisterStudent />
      <GrantCertificate />
      <Output {...{ output }} />
    </main>
  );
}

type OutputT = {
  output: string;
};

/**
 * Create a new Mint for a certificate program
 */
function CreateCertificateProgram() {
  return <div>Create Certificate Program</div>;
}

/**
 * Get all mitns. Useful to get the mint address for a certificate program
 */
function GetCertificatePrograms() {
  return <div>Get Certificate Programs</div>;
}

/**
 * Create a new token account associated with the public key of the student
 */
function RegisterStudent() {
  return <div>Register Student</div>;
}

/**
 * Mint a new NFT to the student's token account
 */
function GrantCertificate() {
  return <div>Grant Certificate</div>;
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
