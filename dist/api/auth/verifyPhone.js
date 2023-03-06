"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const checkPhoneSql = 'SELECT * FROM users where phone = ?';
const otp_ins_for_phone = 'UPDATE users SET OTP = ?  WHERE phone =? ';
const otpsender_1 = __importDefault(require("./otpsender"));
var mysql = require('mysql2');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'aakash',
    database: 'auth'
});
function verifyphoneandsendotp(phone, otp) {
    let phonestatus = '';
    conn.query(checkPhoneSql, [phone], (error, results) => {
        // If Phone Exists  
        if (error) {
            throw error;
        }
        // If Phone exists in DB -> send otp using SNS and run Query
        if (results.length > 0) {
            conn.query(otp_ins_for_phone, [otp, phone], (err, results) => {
                if (err) {
                    throw err;
                }
                (0, otpsender_1.default)(phone, otp);
                console.log('user exists in DB , OTP sent to the phone');
                phonestatus = 'exist';
                console.log(phonestatus);
            });
        }
        else {
            // If Phone does not exist in DB, send otp using otpsender and run query
            const is_registered = 0;
            (0, otpsender_1.default)(phone, otp);
            const phone_and_otp_ins = 'INSERT INTO users(OTP,phone,is_registered) VALUES (?,?,?) ';
            conn.query(phone_and_otp_ins, [otp, phone, is_registered], (error, results) => {
                if (error) {
                    throw error;
                }
            });
            console.log('User with this username does not exist in DB ,OTP sent to the Phone');
            phonestatus = 'new';
            console.log(phonestatus);
        }
    });
    return phonestatus;
}
exports.default = verifyphoneandsendotp;
module.exports = verifyphoneandsendotp;
