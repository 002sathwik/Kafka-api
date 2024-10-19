
import express from 'express';
import bodyParser from 'body-parser';
import { init } from './start.services';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

init();

app.get('/', (req:any, res:any) => {
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

