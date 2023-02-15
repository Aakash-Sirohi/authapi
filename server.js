const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const cookieParser = require('cookie-parser');
var mysql = require('mysql2');
const csurf = require('csurf');

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(csurf({ cookie: true }));

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'aakash',
    database: 'auth'
});

conn.connect((err)=> {
    if(err) throw err   ;
    console.log('Mysql connected...');
});
app.use(bodyParser.json());
app.get('/csrf' ,(req,res)=> {
    res.json({ csrfToken: req.csrfToken() });
    
});

//Registering a user using POST
app.post('/register' , (req,res)=>{
    console.log(req.body);
    const firstname = req.body.data.firstname;
    const lastname = req.body.data.lastname;
    const username = req.body.data.username;
    const email = req.body.data.email;
    const password = req.body.data.password;
    
    const sql = 'INSERT INTO users(firstname,lastname,username,email,password) VALUES (?,?,?,?,?)';
    const values = [firstname,lastname,username,email,password];
    
    conn.query(sql, values , (error, results) => {
        if (error) {
          return res.status(500).json({ error });
        }
        res.json({ message: 'User added successfully to user table.' });
      });
    });


// //Getting users using GET 
// app.get('/register', function(req,res){
//     res.send('Get was called');
// })    

app.post('/login', function(req,res){
console.log(req.body.data.csrfToken );
    if (req.csrfToken() !== req.body.data.csrfToken) {
        res.status(403).send('CSRF token invalid');
        return;
      }
    
    const username = req.body.data.username;
    const password = req.body.data.password;
    const checkUserSql = 'SELECT * FROM users where username = ?';
    const passwordMatch = 'SELECT password FROM users WHERE username=?';

    conn.query(checkUserSql,[username],(error,results) => {
        if(error){
            throw error;
        }
        // if(results.length>0){
        //     results.forEach((row) => {
        //         console.log('User:', row)});
        // }else{
        //     console.log('user with this username does not exist in DB');
        //     res.json({message:'User Does Not Exist',status:404});
        // }
    });

    conn.query(passwordMatch,[username],(error,results)=>{
        let passdb;
        if(error){
            throw error;
        } 
        if(results.length>0){
            results.forEach((row) => {
                passdb = row.password;
                console.log(passdb);
            });}
                
        if(passdb==password){
            res.json({message:'Success',status:200,csrfToken: req.csrfToken()});
        }else{
            res.json({message:'Incorrect Password',status:400});
        }
               
    

});
   


})




app.listen(4000,()=> {
  console.log("Server running successfully on 4000");

})