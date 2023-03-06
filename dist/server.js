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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes/routes"));
const sequelize_1 = __importDefault(require("./sequelize"));
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(body_parser_1.default.json());
exports.app.use(body_parser_1.default.urlencoded({ extended: true }));
exports.app.use('/api', routes_1.default);
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize_1.default.sync();
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error.message);
    }
    exports.app.listen(4000, () => {
        console.log(`Server running sucessfully on port ` + `${4000}`);
    });
}))();
// const conn = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "aakash",
//   database: "auth",
// });
// conn.connect((err: any) => {
//   if (err) throw err;
//   console.log("Mysql connected...");
// });
//Registered Status of user registered with email
// app.get("/getstatus", function ( req: { body: { email: any; }; }, res: { send: (arg0: string) => void; }) {
//   const email = req.body.email;
//   const getstatus_sql = "SELECT is_registered FROM users where email =?";
//   conn.query(getstatus_sql, [email], (error: any, results: any[]) => {
//     if (error) {
//       throw error;
//     }
//     const status = results.map((obj) => obj.is_registered);
//     console.log(status);
//     if (status) {
//       res.send("This user is registered with us!");
//     }
//     {
//       res.send("You need to sign up");
//     }
//   });
// });
// app.post("/verifyotp", function (
//   req: { body: { fdata: { email: any; otp: any; phone: any; }; }; }, 
//   res: { send: (arg0: { message: string; is_registered?: any; }) => void; }) {
//   const email = req.body.fdata.email;
//   const otp = req.body.fdata.otp;
//   const phone = req.body.fdata.phone;
//   console.log(email);
//   console.log("req to verify otp for " + email, "and otp is " + otp);
//   if (email) {
//     const get_otp_sql = "SELECT OTP,is_registered FROM users where email =?";
//     conn.query(get_otp_sql, [email], (error: any, results: any[]) => {
//       if (error) {
//         throw error;
//       }
//       const otpDB = results.map((obj) => obj.OTP);
//       const isrdb = results.map((obj) => obj.is_registered);
//       console.log(otpDB);
//       if (otpDB == otp) {
//         res.send({ message: "OTP Verified!", is_registered: isrdb });
//       } else res.send({ message: "incorrect OTP!" });
//     });
//   } else if (phone) {
//     const get_otp_sql = "SELECT OTP,is_registered FROM users where phone =?";
//     conn.query(get_otp_sql, [phone], (error: any, results: any[]) => {
//       if (error) {
//         throw error;
//       }
//       const otpDB = results.map((obj) => obj.OTP);
//       const isrdb = results.map((obj) => obj.is_registered);
//       console.log(otpDB);
//       if (otpDB == otp) {
//         res.send({ message: "OTP Verified!", is_registered: isrdb });
//       } else res.send({ message: "incorrect OTP!" });
//     });
//   }
// });
// app.post("/adduser", function (req: { body: { fdata: { name: any; phone: any; grade: any; }; }; }, res: { send: (arg0: { message: string; }) => void; }) {
//   const name = req.body.fdata.name;
//   const phone = req.body.fdata.phone;
//   const grade = req.body.fdata.grade;
//   const is_registered = 1;
//   const sql_name_grade =
//     "UPDATE users SET name =?, grade =?, is_registered=? where phone = ?";
//   conn.query(
//     sql_name_grade,
//     [name, grade, is_registered, phone],
//     (err: any, results: { affectedRows: number; }) => {
//       if (err) {
//         throw err;
//       }
//       if (results.affectedRows == 1) {
//         console.log("User Phone exists in DB, added name & gradeto the table!");
//         res.send({ message: "User added Successfully" });
//       }
//     }
//   );
// });
// app.get("/grades", function (req: any, res: { send: (arg0: { "5-7": string[]; "8-10": string[]; "5-G": string[]; }[]) => void; end: () => void; }) {
//   const grades = [
//     {
//       "5-7": ["Grade 5", "Grade 6", "Grade 7"],
//       "8-10": ["Grade 8", "Grade 9", "Grade 10"],
//       "5-G": ["Grade 11", "Grade 12", "Graduation"],
//     },
//   ];
//   res.send(grades);
//   res.end();
// });
// 
