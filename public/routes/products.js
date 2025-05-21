// routes/products.js
import { Router } from 'express';
export const router = Router();

router.get('/', async (req, res) => {
  const { gender, category, filter } = req.query;

  let sql = 'SELECT * FROM products WHERE 1';
  const params = [];

  if (gender)   { sql += ' AND gender = ?';              params.push(gender); }
  if (category) { sql += ' AND category = ?';            params.push(category); }
  if (filter === 'sale')          sql += ' AND is_sale = TRUE';
  if (filter === 'free_shipping') sql += ' AND is_free_shipping = TRUE';

  try {
    const [rows] = await req.pool.execute(sql, params);
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'DB error' });
  }
});
