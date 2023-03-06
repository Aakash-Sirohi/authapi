const checkPhoneSql = 'SELECT * FROM users where phone = ?';
const otp_ins_for_phone = 'UPDATE users SET OTP = ?  WHERE phone =? ';
import User from '../../src/models/Users';
import otpsender from './otpsender';
var mysql = require('mysql2');

// const conn = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'aakash',
//     database: 'auth'
// });

export default function verifyphoneandsendotp(phone: string,otp: number){
        let phonestatus = '';
        console.log(User.findAll({where:{
            phone:phone
        }}));
        
        return phonestatus;
}

 module.exports = verifyphoneandsendotp ;
