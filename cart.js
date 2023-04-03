
const express = require('express');
const route = express.Router();
const connection = require('../config/db');



route.post('/cart/add', (req, res) => {
   const productId = req.body.productId;
   const quantity = req.body.quantity;
   const cart = req.session.cart || {};
   cart[productId] = (cart[productId] || 0) + parseInt(quantity);
   req.session.cart = cart;
   res.redirect('/cart');
 });
 route.get('/cart', (req, res) => {
   const cart = req.session.cart || {};
   const productIds = Object.keys(cart);
   const products = productData.filter(product => productIds.includes(product.id.toString()));
   let total = 0;
   products.forEach(product => {
     product.quantity = cart[product.id.toString()];
     product.subtotal = product.price * product.quantity;
     total += product.subtotal;
   });
   res.render('cart', { products, total });
 });
 module.exports = route;