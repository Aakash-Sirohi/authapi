const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
var mysql = require('mysql2');

const app = express();

app.use(cors());


const conn =mysql.createConnection({
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


//Getting users using GET 
app.get('/register', function(req,res){
    res.send('Get was called');
})    

app.post('/login', function(req,res){
    
    const username = req.body.data.username;
    const password = req.body.data.password;
    const checkUserSql = 'SELECT * FROM users where username = ?';
    const passwordMatch = 'SELECT password FROM users WHERE username=?';
    conn.query(checkUserSql,[username],(error,results) => {
        if(error){
            throw error;
        }
        if(results.length>0){
            console.log('user with this username exists in DB');
            console.log('username entered by the user is: ',username + 'password entered by the user is: ',password);
            conn.query(passwordMatch,[username],(error,results)=>{
                if(error){
                    throw error;
                } if(results){
                    res.json({message:'User exists and passwords are matching',status:200});
                }else{
                    res.json({message:'User exists but passwords do not match',status:400});
                }
            })
        }else{
            console.log('user with this username does not exist in DB');
            res.json({message:'User Does Not Exist',status:404});
            
        }
        
    })

    
})
app.listen(4000,()=> {
  console.log("Server running successfully on 4000");

})