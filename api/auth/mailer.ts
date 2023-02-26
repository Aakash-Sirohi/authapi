// import createTransport from 'nodemailer';

// export function mailer ( email: string, otp: number){

//     const transporter =  createTransport({
//         service: 'gmail',
//         auth: {  
//           user: '500052763@upesalumni.upes.ac.in',
//           pass: 'Aakash1997@'
//         }
//       });
//     const mailOptions = {
//         from: '500052763@upesalumni.upes.ac.in',
//         to: email,
//         subject: 'OTP for validating the user',
//         text: `Your Verification code is ${otp}`
//       };

//     return  transporter.sendMail(mailOptions, function(error, info){
//         if (error) {
//           console.log(error);
//         } else {
//           console.log('Email sent: ' + info.response);
//           res.send({message:'OTP sent sucessfully on your email address'})
//         }
//       });
//   }

//   mailer("aakashsrh@gmail.com",123435);