const AWS = require('aws-sdk');
var mysql = require('mysql2');
const sns = new AWS.SNS({
    region:'ap-south-1',
    accessKeyId:'AKIA42SUSLOIC4LIV5FH',
    secretAccessKey: '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'
})

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'aakash',
    database: 'auth'
});

function otpsender(phone,otp){

    const params = {
        Message: `Your OTP is ${otp}`,
        PhoneNumber: '+91'+phone
    }   

    sns.publish(params,(err,data)=>{
        if(err){
          console.log(err);
        }else {
          console.log(data);
        }
      });

}

module.exports=otpsender;