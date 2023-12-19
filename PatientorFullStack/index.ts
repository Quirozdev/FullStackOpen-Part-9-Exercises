import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('aa');
});

app.get('/api/ping', (_req, res) => {
  console.log('pong');
  return res.send('pong');
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
