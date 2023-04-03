const express = require('express');
const mysql = require('mysql2');
const session = require('express-session');
const bcrypt = require('bcrypt');
const path = require('path')
const app = express();
const connection= require('./config/db')
const reload = require('reload');
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'your_secret_here',
  resave: false,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname,'public')))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/',require('./routes/pages'))

const register = require('./routes/register');
app.use('/register', register);
const login = require('./routes/login');
app.use('/login', login);
const products = require('./routes/products');
app.use(products)
const category = require('./routes/category');
app.use(category)
const cart = require('./routes/cart');
app.use(cart)
app.get('/search', (req, res) => {
  const { query } = req.query;
  const sql = `SELECT * FROM products WHERE name LIKE '%${query}%'`;

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
    } else {
      res.render('search')
    }
  });
});




const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
