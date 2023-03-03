
const checkEmailSql = 'SELECT * FROM users where email = ?';
const otp_ins_for_email = 'UPDATE users SET OTP = ?  WHERE email =? ';
const mailer = require('./mailer');
var mysql = require('mysql2');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'aakash',
    database: 'auth'
});
function verifyemailandsendotp(email,otp){
        let emailstatus = '';
        conn.query(checkEmailSql,[email],(error,results) => {
        // If Email Exists  
        if(error){
            throw error;
        }
            // If email exists in DB -> send otp using mailer and run Query
            if(results.length>0){
                
            mailer(email,otp);
            conn.query(otp_ins_for_email,[otp,email],(err,results)=>{
              if(err){
                throw err;
            }
            console.log('user exists in DB , OTP sent to the email');
            emailstatus = 'exist';
            console.log(emailstatus);
            })
            }else{
            // If email does not exist in DB, send otp using mailer and run query
            const is_registered =0;
            mailer(email,otp);
      
            const email_and_otp_ins = 'INSERT INTO users(OTP,email,is_registered) VALUES (?,?,?) ';
           
            conn.query(email_and_otp_ins,[otp,email,is_registered],(error,results)=>{
                if(error){
                    throw error;
                }
            })
            console.log('User with this username does not exist in DB ,OTP sent to the email');
            emailstatus = 'new';
            console.log(emailstatus);
             }
        });
        return emailstatus;
}

 module.exports = verifyemailandsendotp ;
