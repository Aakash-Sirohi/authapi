"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyemailandsendotp = exports.getotpforemail = exports.getotpforusername = void 0;
const Users_1 = __importDefault(require("../models/Users"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const crypto_1 = __importDefault(require("crypto"));
function validateEmailOrPhoneNumber(username) {
    // Email pattern regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    // Test email against regex pattern
    if (emailRegex.test(username)) {
        return "email";
    }
    else if (phoneRegex.test(username)) {
        return "phone";
    }
    else {
        return "invalid";
    }
}
function convertToUsername(username) {
    return crypto_1.default.createHash('sha256').update(username).digest('hex');
}
const getotpforusername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    Users_1.default.sync();
    //input username
    const username = convertToUsername(req.body.fdata.username);
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(username);
    if (validateEmailOrPhoneNumber(req.body.fdata.username) == 'phone') {
        const phone = req.body.fdata.username;
        const existingUser = yield Users_1.default.findOne({
            where: {
                username: username,
                phone: phone
            }
        });
        if (existingUser) {
            yield Users_1.default.update({ otp: otp }, { where: { phone: phone,
                    username: username
                } });
            return res.status(200).json({ Message: 'OTP Resent to Phone!' });
        }
        else {
            try {
                const newUser = yield Users_1.default.create({ username, phone, otp });
                return res.status(200).json(newUser);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error creating user' });
            }
        }
    }
});
exports.getotpforusername = getotpforusername;
const getotpforemail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    Users_1.default.sync();
    const email = req.body.fdata.email;
    const existingUser = yield Users_1.default.findOne({
        where: {
            email: email
        }
    });
    if (existingUser) {
        const updateOtp = yield Users_1.default.update({ otp: otp }, { where: { email: email } });
        return res.status(200).json({ Message: 'OTP Resent to Email!' });
    }
    else {
        try {
            const newUser = yield Users_1.default.create({ email, otp });
            console.log(newUser);
            return res.status(200).json(newUser);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error creating user' });
        }
    }
});
exports.getotpforemail = getotpforemail;
const verifyemailandsendotp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    Users_1.default.sync();
    let emailstatus = '';
    const email = req.body.fdata.email;
    const existingUser = yield Users_1.default.findOne({
        where: {
            email: email
        }
    });
    if (existingUser) {
        mailer(email, otp);
        const otp_insert_for_email = yield Users_1.default.update({ otp: otp }, { where: { email: email } });
        emailstatus = 'exist';
    }
    else {
        const is_registered = 0;
        mailer(email, otp);
        const email_and_otp_insert = yield Users_1.default.update({ otp: otp,
            is_registered: is_registered }, { where: { email: email } });
    }
});
exports.verifyemailandsendotp = verifyemailandsendotp;
function mailer(email, otp) {
    const transporter = nodemailer_1.default.createTransport({
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
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
}
