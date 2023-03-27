import { Keypair } from '@solana/web3.js';
import { readFile } from 'fs/promises';

const t = (
  await import('./wallet.json', {
    assert: { type: 'json' }
  })
).default;
// solana address -k wallet.json
export const WALLET_KEYPAIR = Keypair.fromSecretKey(new Uint8Array(t));

const file = await readFile('./package.json', 'utf8');
export const pkg = JSON.parse(file);

export function localStorage(options) {
  return {
    install(metaplex) {
      metaplex.storage().setDriver(new LocalStorageDriver(options));
    }
  };
}

class LocalStorageDriver {
  constructor(options) {
    if (!options.baseUrl) {
      throw new Error('Missing baseUrl option');
    }
    this.baseUrl = options.baseUrl;
    this.costPerByte = 2;
  }
  async getUploadPrice(bytes) {
    const { amount } = await import('@metaplex-foundation/js');
    return amount(this.costPerByte * bytes, { symbol: 'SOL', decimals: 9 });
  }
  async upload(file) {
    const uri = `${this.baseUrl}meta/${file.uniqueName}`;
    await fetch(uri, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(file.buffer)
    });
    return uri;
  }
  async download(uri) {
    const { toMetaplexFile } = await import('@metaplex-foundation/js');
    const res = await fetch(uri);
    if (!res) {
      throw new Error(`URI not found: ${uri}`);
    }
    const buffer = await res.arrayBuffer();
    const metaplexFile = toMetaplexFile(buffer, uri);
    return metaplexFile;
  }
}
