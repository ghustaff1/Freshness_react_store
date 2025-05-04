import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import routes from './routes.js';
const app = express();
const port = 5000;
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'sqlPa$$word',
  database: 'refr_db',
};
async function startServer() {
  try {
    const db = await mysql.createConnection(dbConfig);
    console.log('Підключено до MySQL');
    app.use('/api', routes(db));
    app.listen(port, () => {
      console.log(`Сервер працює на http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Помилка підключення до MySQL:', error);
    process.exit(1);
  }
}
startServer();