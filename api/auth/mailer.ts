const nodemailer = require('nodemailer');

export default function mailer (email: any, otp: any){

     const transporter =  nodemailer.createTransport({
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

  transporter.sendMail(mailOptions, function(error: any, info: { response: string; }){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  }

 
module.exports= mailer;