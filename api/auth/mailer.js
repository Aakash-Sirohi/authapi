const nodemailer = require('nodemailer');

function mailer (email, otp){

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

  transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  }

 
module.exports= mailer;