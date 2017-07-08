import Express from 'express';
import http from 'http';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import fs from 'fs';

// API routes
import routes from './config/routes.js';

// Database
import {db} from './config/database.js';

db
  .authenticate()
  .then(() => {
    console.log('DB Connection has been established successfully.'.magenta);
  })
  .catch(err => {
    console.error('DB Unable to connect to the database:'.red, err);
  });

const app = new Express();
const server = new http.Server(app);
const logPath = __dirname + '/../logs/api.log';
const accessLogStream = fs.createWriteStream(logPath, { flags: 'a' });

app.set('trust proxy', 1);
app.use(cookieParser());
app.use(morgan('combined', { stream: accessLogStream }));
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(routes);

server.listen(3030, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`
  ____  _             _   _       _     
 | __ )| | ___   __ _| | | |_   _| |__  
 |  _ \\| |/ _ \\ / _\` | |_| | | | | '_ \\ 
 | |_) | | (_) | (_| |  _  | |_| | |_) |
 |____/|_|\\___/ \\__, |_| |_|\\__,_|_.__/ 
                |___/ 

`);
  console.log('Bloghub api is listening on http://%s:%s', host, port);
});
