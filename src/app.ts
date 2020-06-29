import express from 'express';
import { surpriseMeRouter } from './routes/surpriseMeRouter';

const app = express();
const port = 3000;
const baseUrl = '/api'
// app.get('/', (req, res) => {
//   res.send('The sedulous hyena ate the antelope!');
// });
app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});


app.use(baseUrl,surpriseMeRouter);