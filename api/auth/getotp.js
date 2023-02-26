const phone = req.body.fdata.phone;
console.log(phone);
const checkPhoneSql = 'SELECT * FROM users where phone = ?';
const otp_ins_for_phone = 'UPDATE users SET OTP = ?  WHERE phone =? '