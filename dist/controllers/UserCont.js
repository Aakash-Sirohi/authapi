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
exports.getotp = void 0;
const Users_1 = __importDefault(require("../models/Users"));
const getotp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    Users_1.default.sync();
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(req.body.fdata.phone);
    const phone = req.body.fdata.phone;
    const existingUser = yield Users_1.default.findOne({ where: { phone } });
    if (existingUser) {
        return res.status(409).json({ error: 'A user with this phone number already exists' });
    }
    // res.status(201).json(user.get(phone));
    try {
        const newUser = yield Users_1.default.create({ phone });
        return res.status(201).json(newUser);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error creating user' });
    }
});
exports.getotp = getotp;
