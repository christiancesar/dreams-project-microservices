import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import interceptErrorMiddleware from './middlewares/interceptErrorMiddleware';
import routes from './routes';

const server = express();

server.use(cors());

server.use(express.json());

server.use(routes);

server.use(interceptErrorMiddleware);

async function main() {

  server.listen(3333, () => {
    console.log('Server listen on port 3333! 🍹')
  })
}

main()
  .catch(err => console.error(err))
  .finally(async () => {
  })

