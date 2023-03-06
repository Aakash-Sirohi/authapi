"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
var mysql = require('mysql2');
const sns = new aws_sdk_1.SNS({
    region: 'ap-south-1',
    accessKeyId: 'AKIA42SUSLOIC4LIV5FH',
    secretAccessKey: '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'
});
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'aakash',
    database: 'auth'
});
function otpsender(phone, otp) {
    const params = {
        Message: `Your OTP is ${otp}`,
        PhoneNumber: '+91' + phone
    };
    sns.publish(params, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(data);
        }
    });
}
exports.default = otpsender;
module.exports = otpsender;
