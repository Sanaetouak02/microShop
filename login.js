const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const connection = require('../config/db');

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).render('login', {
        message: "Please Provide an email and password"
    })
    
    
}

  connection.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
    if (error) throw error;

    if (results.length > 0) {
      const user = results[0];

      bcrypt.compare(password, user.password, (err, match) => {
        if (err) throw err;

        if (match) {
          req.session.user = { id: user.id, name: user.name, email: user.email };
                 
          for(const row of results){
           
                            if(row.role==='admin'){
                                  res.status(200).render("./admin");
                                console.log("1 work")
                                }
                             else{ res.status(200).render("./client");
                             console.log("2  work")} }
          
        } else {
          res.send('Incorrect password');
        }
      });
    } else {
      res.send('User not found');
    }
   
  });
});
module.exports=router;