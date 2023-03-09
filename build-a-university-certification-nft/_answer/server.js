import { readFileSync, writeFileSync } from 'fs';
import express from 'express';

const app = express();

app.use(express.json());

app.get('/:id', (req, res) => {
  const metadatas = getMetadatas();
  const metadata = metadatas[req.params.id];
  if (!metadata) {
    return res.status(404).end();
  }

  console.log('GET', req.params.id);

  return res.send(Buffer.from(metadata));
});
app.put('/:id', (req, res) => {
  console.log('POST', req.params.id);
  const metadatas = getMetadatas();
  metadatas[req.params.id] = req.body;
  writeMetadatas(metadatas);
  res.status(200).end();
});

app.get('/ping', (_req, res) => {
  res.status(200).send('pong');
});

app.listen(3001, () => {
  console.log('Server started');
});

function getMetadatas() {
  const metadatas = readFileSync('metadatas.json', 'utf8');
  return JSON.parse(metadatas);
}

function writeMetadatas(metadatas) {
  writeFileSync('metadatas.json', JSON.stringify(metadatas));
}
