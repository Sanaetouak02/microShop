const express = require('express');
const route = express.Router();
const connection = require('../config/db');
route.get('/category/:categoryName', function(req, res) {
  var categoryName = req.params.categoryName;
  // Query the MySQL database to retrieve products for the specified category
  connection.query('SELECT * FROM products WHERE name= ?', [categoryName], function(error, results, fields) {
    if (error) throw error;
    // Render the EJS template with the products data and pass it to the response
    res.render('category', { categoryName: categoryName, products: results });
  });
});



 
module.exports = route;