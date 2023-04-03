const express = require('express');
const router = express.Router();
const connect= require('../config/db')


router.get('/', (req, res)=>{
   res.render('home');
 });
 router.get('/register', (req, res)=>{
   res.render('register');
 });
 router.get('/login', (req, res)=>{
   res.render('login');
 });
 router.get('/admin', (req, res) => {
  res.render('admin');
});

// Client route
router.get('/client', (req, res) => {
  res.render('client');
});
router.get('/about', (req, res)=>{
  res.render('about');
});
router.get('/contact', (req, res)=>{
  res.render('contact');
});
router.get('/cart', (req, res)=>{
  res.render('cart');
});

 module.exports=router;