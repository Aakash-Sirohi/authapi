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
exports.getotpforemail = exports.getotpforphone = void 0;
const Users_1 = __importDefault(require("../models/Users"));
const otp = Math.floor(100000 + Math.random() * 900000);
const getotpforphone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    Users_1.default.sync();
    const phone = req.body.fdata.phone;
    console.log(req.body);
    const existingUser = yield Users_1.default.findOne({
        where: {
            phone: phone
        }
    });
    if (existingUser) {
        const updateOtp = yield Users_1.default.update({ otp: otp }, { where: { phone: phone } });
        return res.status(200).json({ Message: 'OTP Resent to Phone!' });
    }
    else {
        try {
            const newUser = yield Users_1.default.create({ phone, otp });
            return res.status(200).json(newUser);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error creating user' });
        }
    }
});
exports.getotpforphone = getotpforphone;
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
