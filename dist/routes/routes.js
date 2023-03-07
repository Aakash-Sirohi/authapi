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
// import getotp from '../../api/auth/getotp';
const UserCont_1 = require("../controllers/UserCont");
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Users_1.default.sync();
        debugger;
        // const data = await Users.findAll();
        console.log('tyring to send resposne');
        res.send("Table created");
        res.status(500);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}));
router.post('/getotp', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.fdata;
    yield (0, UserCont_1.getotpforusername)(req, res);
}));
router.post('/verifyotp', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, UserCont_1.verifyemailandsendotp)(req, res);
}));
exports.default = router;
