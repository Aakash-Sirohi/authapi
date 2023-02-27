const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const cookieParser = require('cookie-parser');
var mysql = require('mysql2');
const AWS = require('aws-sdk');
const Sequelize = require('sequelize');
const sns = new AWS.SNS({
    
});

AWS.config.update({ region: 'ap-south-1' });

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
//app.use(csurf({ cookie: true }));

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'aakash',
    database: 'auth'
});

const ses = new AWS.SES({
    region:'ap-south-1',
    accessKeyId:'AKIA42SUSLOIC4LIV5FH',
    secretAccessKey: '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'
})
// const sequelize = new Sequelize('auth', 'root', 'aakash', {
//   host: 'localhost',
//   dialect: 'mysql'
// });
// const User = sequelize.define('user', {
//   username: Sequelize.STRING,
//   email: Sequelize.STRING,
//   password: Sequelize.STRING
// });

// sequelize.sync()
//   .then(() => {
//     console.log('Database and tables created!');
//   });

//   User.create({
//     username: 'john_doe',
//     email: 'john.doe@example.com',
//     password: 'mypassword'
//   })
//   .then(user => {
//     console.log(user.toJSON());
//   });


conn.connect((err)=> {
    if(err) throw err   ;
    console.log('Mysql connected...');
});

app.use(bodyParser.json());

//Registered Status of user registered with email
app.get('/getstatus',function(req,res){
  const email = req.body.email;
  const getstatus_sql = 'SELECT is_registered FROM users where email =?';
  conn.query(getstatus_sql,[email],(error,results)=>{
    if(error){
      throw error;
    }
    const status = results.map(obj => obj.is_registered);
    console.log(status); 
    if(status){
      res.send('This user is registered with us!')
    }{
      res.send('You need to sign up')
    }
  })

})

app.post('/verifyotp',function(req,res){
    const email = req.body.fdata.email;
    const otp = req.body.fdata.otp;
    console.log(email); 
    console.log('req to verify otp for ' + email, 'and otp is ' + otp);
    const get_otp_sql = 'SELECT OTP,is_registered FROM users where phone =?';
    conn.query(get_otp_sql,[email],(error,results)=>{
      if(error){
        throw error;
      }
     
      const otpDB = results.map(obj => obj.OTP);
      const isrdb = results.map(obj => obj.is_registered);
     
      console.log(otpDB); 
      if(otpDB==otp){
        res.send({message:'OTP Verified!',is_registered:isrdb});
      }else res.send({message:'incorrect OTP!'})
    })
})
app.post('/adduser',function(req,res){
  const name = req.body.fdata.name;
  const phone = req.body.fdata.phone;
  const grade = req.body.fdata.grade;
  const is_registered =1;
  const sql_name_grade = 'UPDATE users SET name =?, grade =?, is_registered=? where phone = ?';
  conn.query(sql_name_grade,[name,grade,is_registered,phone],(err,results)=>{
    if(err ){
      throw err;
    }
   
    if(results.affectedRows==1){
      console.log('User Phone exists in DB, added name & gradeto the table!');
      res.send({message:'User added Successfully'});
}});
})

app.get('/grades',function(req,res){
  const grades = [{'5-7':['Grade 5','Grade 6','Grade 7'],'8-10':['Grade 8','Grade 9','Grade 10'],'5-G':['Grade 11','Grade 12','Graduation']}];
  res.send(grades);
  res.end();
})
app.post('/getotp', function(req,res){
    const email = req.body.fdata.email;
    console.log(email);
    const phone = req.body.fdata.phone;
    console.log(phone);
    const otp = Math.floor(100000 + Math.random() * 900000);
    if(phone){
      
      const checkPhoneSql = 'SELECT * FROM users where phone = ?';
      const otp_ins_for_phone = 'UPDATE users SET OTP = ?  WHERE phone =? ';
      var phonecheck = conn.query(checkPhoneSql,[phone],(error,results)=>{
        if(error ){
          throw error;
        } if(results.length>0){
          console.log('user exists in DB, OTP sent to Phone!');
          const params = {
            Message: `Your OTP is ${otp}`,
            PhoneNumber: '+91'+phone // format with country code, e.g. '+1XXXYYYZZZZ'
          };
          console.log(params.Message);
          sns.publish(params,(err,data)=>{
            if(err){
              console.log(err);
            }else {
              console.log(data);
            }
          });
          conn.query(otp_ins_for_phone,[otp,phone],(err,results)=>{
            if(err){
              throw err;
          }
          res.send({message:"OTP sent to your Phone"});
          })
        }else{
          console.log('user with this username does not exist in DB');
          const params = {
            Message: `Your OTP is ${otp}`,
            PhoneNumber: '+91'+phone // format with country code, e.g. '+1XXXYYYZZZZ'
          };
          console.log(params.Message);
          sns.publish(params,(err,data)=>{
            if(err){
              console.log(err);
            }else {
              console.log(data);
            }
          });
          const is_registered =0;
          const phone_and_otp_ins = 'INSERT INTO users(OTP,phone,is_registered) VALUES (?,?,?) ';
          conn.query(phone_and_otp_ins,[otp,phone,is_registered],(error,results)=>{
              if(error){
                  throw error;
              }
          })
        }
      })
    }else if(email){ 

    const checkEmailSql = 'SELECT * FROM users where email = ?';
    const otp_ins_for_email = 'UPDATE users SET OTP = ?  WHERE email =? ';
    var emailcheck = conn.query(checkEmailSql,[email],(error,results) => {
      if(error){
          throw error;
      }
          if(results.length>0){
          console.log('user exists in DB , OTP sent to the email');
          conn.query(otp_ins_for_email,[otp,email],(err,results)=>{
            if(err){
              throw err;
          }
          res.send({message:"OTP sent to your email"});
          })
          }else{
          console.log('user with this username does not exist in DB');
          const is_registered =0;
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: '500052763@upesalumni.upes.ac.in',
              pass: 'Aakash1997@'
            }
          });
         
          const mailOptions = {
            from: '500052763@upesalumni.upes.ac.in',
            to: email,
            subject: 'OTP for validating the user',
            text: `Your Verification code is ${otp}`
          };
  
          const email_and_otp_ins = 'INSERT INTO users(OTP,email,is_registered) VALUES (?,?,?) ';
          conn.query(email_and_otp_ins,[otp,email,is_registered],(error,results)=>{
              if(error){
                  throw error;
              }
          })
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              res.send({message:'OTP sent sucessfully on your email address'})
            }
          });
  
        
          
         
           }
    
      });

  
  }
   
    

})




app.listen(4000,()=> {
  console.log("Server running successfully on 4000");

})