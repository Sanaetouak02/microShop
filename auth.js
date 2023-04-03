const db = require('../config/db')
const jwt= require("jsonwebtoken");
const bcrypt= require("bcryptjs");
const { promisify } = require("util");




exports.login = async (req, res) => {
    try {


        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).render('login', {
                message: "Please Provide an email and password"
            })
            
            
        }
        db.query('SELECT * FROM users ',[email], async (err, results) => {
       
                 
            for(const row of results){
                if(row.email===email&row.password===password){
                                if(row.role==='responsable'){
                                      res.status(200).redirect("/responsable");
                                    console.log("1 work")
                                    }
                                 else{ res.status(200).redirect("/user_index");
                                 console.log("2  work")}
                              }
                                else{
                               
                                
                                console.log("3 work")
                            } 
                        }
              
               
            
        })
    } catch (err) {
        console.log(err);
    }
}

exports.register=(req,res)=>{
    console.log(req.body);

    const {name,email,password,role,passwordConfirm}=req.body;

db.query('select email from users where email= ?',[email],async(error,results)=>{
    if(error){
        console.log(error)
    }if(results.length>0){
return res.render('register',{
    message:'that email alredy used or not exist'
})
    } else{if(password!==passwordConfirm){
        console.log('the password falseeee')
return res.render('register',{
    message:'password false'
 
}




)}
if (!name||!email || !password||!role) {
  
    return res.render('register',{
        message:'please enter all your information'
     
    })
}} 

let hashePassword= await bcrypt.hash(password,8);
console.log( `this is the hass password ${hashePassword}`)
db.query('insert into users SET ?' ,{name:name,email:email,password:password,role:role},(error,results)=>{


    if(error){
        console.log(error)
    }else{
       if(role==="do"){return res.render('user_index',{
    message:'registred done'})
    }
else{
    return res.render('responsable',{
        message:'registred done'})  
}} 




})
})
   
}