import { readFileSync, writeFileSync } from 'fs';
import cors from 'cors';
import express from 'express';
import { setDefaultResultOrder } from 'dns';

setDefaultResultOrder('ipv4first');

const app = express();

app.use(cors());
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
app.use(express.json());

app.get('/status/ping', (_req, res) => {
  console.log('Got ping');
  return res.status(200).send('pong');
});

app.get('/meta/:id', (req, res) => {
  console.log('GET', req.params.id);
  const metadatas = getMetadatas();
  const metadata = metadatas[req.params.id];
  if (!metadata) {
    return res.status(404).end();
  }

  return res.send(Buffer.from(metadata));
});
app.put('/meta/:id', (req, res) => {
  console.log('POST', req.params.id);
  const metadatas = getMetadatas();
  metadatas[req.params.id] = req.body;
  writeMetadatas(metadatas);
  res.status(200).end();
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log('Server started at', `http://127.0.0.1:${PORT}`);
});

function getMetadatas() {
  const metadatas = readFileSync('metadatas.json', 'utf8');
  return JSON.parse(metadatas);
}

function writeMetadatas(metadatas) {
  writeFileSync('metadatas.json', JSON.stringify(metadatas));
}
