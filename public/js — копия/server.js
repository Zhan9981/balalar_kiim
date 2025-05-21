import express  from 'express';
import mysql    from 'mysql2/promise';
import cors     from 'cors';

const app  = express();
const port = 3000;

/* --- DB қосылымы --- */
const pool = mysql.createPool({
  host    : 'localhost',
  user    : 'root',
  password: ' Zhansaya0089',
  database: 'balalar-kiim',
  waitForConnections: true,
  connectionLimit   : 10
});

/* --- CORS & static --- */
app.use(cors());
app.use(express.static('public'));      // картинки & html/js/css

/* --- API: Барлық өнімдер --- */
app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({error:'DB error'});
  }
});

/* --- Серверді іске қосу --- */
app.listen(port, () => console.log(`Server ⟿ http://localhost:${port}`));
