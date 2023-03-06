import express, { Request, Response } from 'express';
import User from '../models/Users';
import router from '../routes/routes';
import { Where } from 'sequelize/types/utils';
import nodemailer from 'nodemailer';
  
   
  export const getotpforphone = async (req: Request, res: Response) => {
      User.sync();
      const otp = Math.floor(100000 + Math.random() * 900000);
      const phone = req.body.fdata.phone;
      console.log(req.body)
      const existingUser = await User.findOne({ 
        where: { 
            phone:phone
            
      } });  
      
      if (existingUser) {
        const updateOtp = await User.update(
          { otp: otp },
          { where: { phone: phone } }
        );
        return res.status(200).json({ Message: 'OTP Resent to Phone!' });
      } else{
        try  {
          const newUser = await User.create( {phone,otp} );
             
              return res.status(200).json(newUser);
            }catch (error) {
              console.error(error);
            return res.status(500).json({ error: 'Error creating user' });
          }
      }           
  }

  export const getotpforemail = async (req: Request, res: Response) => {
    User.sync();
    const otp = Math.floor(100000 + Math.random() * 900000);
    const email = req.body.fdata.email;
   
    const existingUser = await User.findOne({ 
      where: { 
        email:email
          
    } });  
    
    if (existingUser) {
      const updateOtp = await User.update(
        { otp: otp },
        { where: { email: email } }
      );
      return res.status(200).json({ Message: 'OTP Resent to Email!' });
    } else{
      try  {
        const newUser = await User.create( {email,otp} );
            console.log(newUser);
            return res.status(200).json(newUser);
          }catch (error) {
            console.error(error);
          return res.status(500).json({ error: 'Error creating user' });
        }
    }           
}

export const verifyemailandsendotp = async(req:Request, res:Response) => {
    User.sync();
    let emailstatus = '';
    const email = req.body.fdata.email;
    const otp = req.body.fdata.otp;
    // If email exists in DB -> send otp using mailer and run Query
    // Checking for email in DB

    const emailexists = await User.findOne({
      where: { 
        email:email
    } 
    })

    if(emailexists){
      mailer(email,otp);
    }
     else{
      const is_registered =0;
      mailer(email,otp);

      const registeringUser = await User.update(
        {otp:otp,
        is_registered:is_registered
        },
        {where : {email:email}}
      )
      console.log('User with this username does not exist in DB ,OTP sent to the email');
      emailstatus = 'new';
      console.log(emailstatus);
     }
}



function mailer(email: any, otp: any){
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