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
const express_1 = require("express");
const Users_1 = __importDefault(require("../models/Users"));
const getotp_1 = __importDefault(require("../../api/auth/getotp"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Users_1.default.sync();
        // const data = await Users.findAll();
        console.log('i have reached here!');
        res.status(200).json();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}));
router.post('/get-otp', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, getotp_1.default)(req, res);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}));
exports.default = router;
