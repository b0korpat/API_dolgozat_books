import express from 'express';
import cors from 'cors';
import booksRoute from './routes/books.js';
import { initializeDB } from './database.js';


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/books', booksRoute);

initializeDB().then(() => {
  app.listen(PORT, () => {
    console.log(` http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error(err);
});