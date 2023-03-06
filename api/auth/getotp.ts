// import verifyemailandsendotp from "./verifyEmail";
// import verifyphoneandsendotp from "./verifyPhone";


// export default function getotp (
//         req: { body: { fdata: { email: any; phone: any } } },
//         res: { send: (arg0: { message: string }) => void }
//       ) {
//         const email = req.body.fdata.email;
//         // console.log(email);
//         const phone = req.body.fdata.phone;
//         console.log(phone);
//         const otp = Math.floor(100000 + Math.random() * 900000);

//         if (phone) {
//           let verifyPhone = verifyphoneandsendotp(phone, otp);
//           console.log(verifyPhone);
//           if (verifyPhone === "exist") {
//             res.send({
//               message: "User already exists , OTP sent to your Phone",
//             });
//           } else if (verifyPhone === "new")
//             res.send({
//               message:
//                 "User does not exist in DB , OTP still send to the Phone",
//             });
//         } else if (email) {
//           let verifyemail = verifyemailandsendotp(email, otp);

//           if (verifyemail == "exist") {
//             res.send({
//               message: "User already exists , OTP sent to your email",
//             });
//           } else if (verifyemail == "new") {
//             res.send({
//               message:
//                 "User does not exist in DB , OTP still send to the email",
//             });
//           }
//         } else {
//           res.send({ message: "Invalid Input of Email or Phone!" });
//         }
//       }
//     ;