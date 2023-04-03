const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const connection = require('../config/db');

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;

    connection.query('INSERT INTO users SET ?', { name, email, password: hash }, (error, results) => {
      if (error) {
        console.error(error);
        res.send('An error occurred while registering the user');
      } else {
        req.session.user = { id: results.insertId, name, email };
        res.render('./login');
      }
    });
  });
});

module.exports = router;