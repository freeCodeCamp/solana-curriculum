import React from "react";
import ReactDOM from "react-dom/client";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { App } from "./app";
import * as buffer from "buffer";
import "./index.css";

const ENDPOINT =
  import.meta.env.VITE_SOLANA_CONNECTION_URL || "http://127.0.0.1:8899";

window.Buffer = buffer.Buffer;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ConnectionProvider endpoint={ENDPOINT}>
      <WalletProvider wallets={[]} autoConnect={true}>
        <WalletModalProvider>
          <App />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  </React.StrictMode>
);
