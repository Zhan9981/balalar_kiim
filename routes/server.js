import express  from 'express';
import mysql     from 'mysql2/promise';
import path      from 'path';
import { router as productsRouter } from './routes/products.js';

const __dirname = path.resolve();        //  ES-modules үшін
const app  = express();
const PORT = 3000;

// static
app.use(express.static(path.join(__dirname, 'public')));

// DB pool-ды req.pool-ға қоса саламыз
const pool = mysql.createPool({ host:'localhost', user:'root', password:'Zhansaya0089', database:'balalar_kiim' });
app.use((req,res,next)=>{ req.pool = pool; next(); });

// API
app.use('/api/products', productsRouter);

// fallback
app.get('*', (_,res)=>res.sendFile(path.join(__dirname,'public','products.html')));

app.listen(PORT, ()=>console.log('Server on',PORT));
