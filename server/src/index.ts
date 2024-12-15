// server/src/index.ts
import express from 'express';
import cors from 'cors';
import router from './routes';
import dotenv from 'dotenv';
import path from 'path';

// dotenv.config({ path: path.resolve(__dirname, '../.env') });
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../../client/build')));

app.use('/api', router);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
