const express = require('express');
const router = express.Router();
const connection = require('../config/db');

router.get('/products', function(req, res) {
  const query = 'SELECT * FROM products';
  connection.query(query, function(err, results) {
    if (err) {
      console.error('Error getting products:', err);
      return;
    }
    res.render('products', { products: results });
  });
});

module.exports = router;