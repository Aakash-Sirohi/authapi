const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
var mysql = require("mysql2");
const AWS = require("aws-sdk");
const Sequelize = require("sequelize");
const verifyemailandsendotp = require("./api/auth/verifyEmail");
const verifyphoneandsendotp = require("./api/auth/verifyPhone");
// const sns = new AWS.SNS({
//   region:'ap-south-1',
//   accessKeyId:'AKIA42SUSLOIC4LIV5FH',
//   secretAccessKey: '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'

// });

AWS.config.update({ region: "ap-south-1" });
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "aakash",
  database: "auth",
});

const ses = new AWS.SES({
  region: "ap-south-1",
  accessKeyId: "AKIA42SUSLOIC4LIV5FH",
  secretAccessKey: "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",
});
// const sequelize = new Sequelize('auth', 'root', 'aakash', {
//   host: 'localhost',
//   dialect: 'mysql'
// });
//
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

conn.connect((err) => {
  if (err) throw err;
  console.log("Mysql connected...");
});

app.use(bodyParser.json());

//Registered Status of user registered with email
app.get("/getstatus", function (req, res) {
  const email = req.body.email;
  const getstatus_sql = "SELECT is_registered FROM users where email =?";
  conn.query(getstatus_sql, [email], (error, results) => {
    if (error) {
      throw error;
    }
    const status = results.map((obj) => obj.is_registered);
    console.log(status);
    if (status) {
      res.send("This user is registered with us!");
    }
    {
      res.send("You need to sign up");
    }
  });
});

app.post("/verifyotp", function (req, res) {
  const email = req.body.fdata.email;
  const otp = req.body.fdata.otp;
  const phone = req.body.fdata.phone;
  console.log(email);
  console.log("req to verify otp for " + email, "and otp is " + otp);
  if (email) {
    const get_otp_sql = "SELECT OTP,is_registered FROM users where email =?";
    conn.query(get_otp_sql, [email], (error, results) => {
      if (error) {
        throw error;
      }

      const otpDB = results.map((obj) => obj.OTP);
      const isrdb = results.map((obj) => obj.is_registered);

      console.log(otpDB);
      if (otpDB == otp) {
        res.send({ message: "OTP Verified!", is_registered: isrdb });
      } else res.send({ message: "incorrect OTP!" });
    });
  } else if (phone) {
    const get_otp_sql = "SELECT OTP,is_registered FROM users where phone =?";
    conn.query(get_otp_sql, [phone], (error, results) => {
      if (error) {
        throw error;
      }

      const otpDB = results.map((obj) => obj.OTP);
      const isrdb = results.map((obj) => obj.is_registered);

      console.log(otpDB);
      if (otpDB == otp) {
        res.send({ message: "OTP Verified!", is_registered: isrdb });
      } else res.send({ message: "incorrect OTP!" });
    });
  }
});
app.post("/adduser", function (req, res) {
  const name = req.body.fdata.name;
  const phone = req.body.fdata.phone;
  const grade = req.body.fdata.grade;
  const is_registered = 1;
  const sql_name_grade =
    "UPDATE users SET name =?, grade =?, is_registered=? where phone = ?";
  conn.query(
    sql_name_grade,
    [name, grade, is_registered, phone],
    (err, results) => {
      if (err) {
        throw err;
      }

      if (results.affectedRows == 1) {
        console.log("User Phone exists in DB, added name & gradeto the table!");
        res.send({ message: "User added Successfully" });
      }
    }
  );
});

app.get("/grades", function (req, res) {
  const grades = [
    {
      "5-7": ["Grade 5", "Grade 6", "Grade 7"],
      "8-10": ["Grade 8", "Grade 9", "Grade 10"],
      "5-G": ["Grade 11", "Grade 12", "Graduation"],
    },
  ];
  res.send(grades);
  res.end();
});
    app.post("/getotp", function (req, res) {
      const email = req.body.fdata.email;
      // console.log(email);
      const phone = req.body.fdata.phone;
      console.log(phone);
      const otp = Math.floor(100000 + Math.random() * 900000);

      if (phone) {
        let verifyPhone = verifyphoneandsendotp(phone,otp);
        if (verifyPhone === "exist") {
          res.send({ message: "User already exists , OTP sent to your Phone" });
        } else if (verifyPhone === "new")
          res.send({
            message: "User does not exist in DB , OTP still send to the Phone"
          });
      } 
      
      else if (email) {
        let verifyemail = verifyemailandsendotp(email,otp);
        if (verifyemail == "exist") {
          res.send({
            message: "User already exists , OTP sent to your email" 
            
          });
        } else if (verifyemail == "new"){
          res.send({message: "User does not exist in DB , OTP still send to the email"});
        }
        
      } else {
        res.send("Invalid Input of Email or Phone!");
      }
    });

app.listen(4000, () => {
  console.log("Server running successfully on 4000");
});
