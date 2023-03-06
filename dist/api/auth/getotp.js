"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verifyEmail_1 = __importDefault(require("./verifyEmail"));
const verifyPhone_1 = __importDefault(require("./verifyPhone"));
function getotp(req, res) {
    const email = req.body.fdata.email;
    // console.log(email);
    const phone = req.body.fdata.phone;
    console.log(phone);
    const otp = Math.floor(100000 + Math.random() * 900000);
    if (phone) {
        let verifyPhone = (0, verifyPhone_1.default)(phone, otp);
        console.log(verifyPhone);
        if (verifyPhone === "exist") {
            res.send({
                message: "User already exists , OTP sent to your Phone",
            });
        }
        else if (verifyPhone === "new")
            res.send({
                message: "User does not exist in DB , OTP still send to the Phone",
            });
    }
    else if (email) {
        let verifyemail = (0, verifyEmail_1.default)(email, otp);
        if (verifyemail == "exist") {
            res.send({
                message: "User already exists , OTP sent to your email",
            });
        }
        else if (verifyemail == "new") {
            res.send({
                message: "User does not exist in DB , OTP still send to the email",
            });
        }
    }
    else {
        res.send({ message: "Invalid Input of Email or Phone!" });
    }
}
exports.default = getotp;
;
