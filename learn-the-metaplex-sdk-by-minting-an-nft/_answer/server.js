import express from 'express';

const app = express();

app.use(express.json());
app.use(express.static('assets'));

const metadatas = {};

app.get('/:id', (req, res) => {
  const metadata = metadatas[req.params.id];
  if (!metadata) {
    return res.status(404).end();
  }

  console.log('GET', req.params.id);

  return res.send(Buffer.from(metadata));
});
app.put('/:id', (req, res) => {
  console.log('POST', req.params.id);
  metadatas[req.params.id] = req.body;
  res.status(200).end();
});

app.listen(3001, () => {
  console.log('Server started');
});
