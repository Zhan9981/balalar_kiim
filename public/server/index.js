import express from 'express';
import mysql   from 'mysql2promise';
import path    from 'path';

const app = express();
app.use(express.static('public'));           HTML & JS

 --- MySQL қосылымы --- 
const db = await mysql.createPool({
  host'localhost', user'root', database'balastyle', password''});

 --- apiproducts --- 
app.get('apiproducts', async (req,res) = {
  const g  = req.query.gender    null;
  const c  = req.query.category  null;
  const s  = req.query.sort      'newest';

  let order = 'ORDER BY id DESC';
  if (s==='price_asc')  order='ORDER BY price ASC';
  if (s==='price_desc') order='ORDER BY price DESC';

  const [rows] = await db.query(
   `SELECT id,name,
           CONCAT('images',image_url) AS thumb_url,
           price, old_price,
           IF(old_price, ROUND((old_price-price)old_price100), NULL) AS sale,
           is_free_shipping AS free_ship
    FROM products
    WHERE ( IS NULL OR gender=)
      AND ( IS NULL OR category=)
    ${order}`,
    [g,g,c,c]);

  res.json(rows);
});

 --- (қосымша) apiproductsid --- 
app.get('apiproductsid', async (req,res)={
  const [rows] = await db.query('SELECT  FROM products WHERE id=',[req.params.id]);
  if (!rows.length) return res.sendStatus(404);
  res.json(rows[0]);
});

app.listen(3000,()=console.log('httplocalhost3000'));
