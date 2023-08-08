export class Wallet {
  constructor(keypair) {
    this.keypair = keypair;
    this._publicKey = keypair.publicKey;
  }
  async signTransaction(tx) {
    tx.sign(this.keypair);
    return tx;
  }
  async signAllTransactions(txs) {
    txs.map(tx => tx.sign(this.keypair));
    return txs;
  }
  get publicKey() {
    return this._publicKey;
  }
}
