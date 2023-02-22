const express = require("express");
const cors = require("cors");

var mysql = require('mysql2');
const bodyParser = require('body-parser');
const csurf = require('csurf');
const cookieParser = require('cookie-parser');

const app = express();
const csrfProtection = csurf({
    cookie: true
  });   

app.use(cors());
app.use(cookieParser());
app.use(csrfProtection);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


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
app.use(express.static('public'));

app.use(function(req,res,next){
    res.locals.csrfToken = req.csrfToken();
    next();
})
// app.get('/csrf' ,(req,res)=> {
//     // console.log("csrf token sucessfully sent to the client " + req.csrfToken());
//     const sql = 'INSERT INTO csrftoken(token) VALUES (?)';
//     const values = [req.csrfToken()];
//     conn.query(sql,values,(error,results)=>{
//         if (error) {
//             return res.status(500).json({ error });
//           } 

//           res.json( {csrfToken: req.csrfToken()} );
//     })
// });

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

app.post('/login',  function(req,res){

    if(req.csrfToken()!==req.body._csrf){
        return res.status(403).send("invalid csrf token");
    }

    // conn.query(checkUserSql,[username],(error,results) => {
    //     if(error){
    //         throw error;
    //     }
    //     if(results.length>0){
    //         results.forEach((row) => {
    //             console.log('User:', row)});
    //     }else{
    //         console.log('user with this username does not exist in DB');
    //         res.json({message:'User Does Not Exist',status:404});
    //     }
    // });
    // if (req.csrfToken() !== req.body.data.) {
    //     res.status(403).send('CSRF token invalid');
    //     return;
    //   }
    
    // const token = csrfToken;
    // const submittedToken = req.headers.get('X-CSRF-Token');
    // console.log('Token submitted by the user is '+submittedToken);
    // if(token === submittedToken){
    //     console.log("Token is VALID");
    // }else console.log("Token is INVALID");
    
    // const username = req.body.data.username;
    // const password = req.body.data.password;
    // const checkUserSql = 'SELECT * FROM users where username = ?';
    // const passwordMatch = 'SELECT password FROM users WHERE username=?';

    

//     conn.query(passwordMatch,[username],(error,results)=>{
//         let passdb;
//         if(error){
//             throw error;
//         } 
//         if(results.length>0){
//             results.forEach((row) => {
//                 passdb = row.password;
//                 console.log(passdb);
//             });}
                
//         if(passdb==password){
//             res.json({message:'Success',status:200});
//         }else{
//             res.json({message:'Incorrect Password',status:400});
//         }
               
       
          
// });
   
})

app.listen(4000,()=> {
  console.log("Server running successfully on 4000");

})