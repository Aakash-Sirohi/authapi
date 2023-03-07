import express, { Request, Response } from 'express';
import User from '../models/Users';
import router from '../routes/routes';
import { Where, now } from 'sequelize/types/utils';
import nodemailer from 'nodemailer'; 
import crypto from 'crypto';

    function validateEmailOrPhoneNumber(username: string) {
      // Email pattern regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\d{10}$/;
      // Test email against regex pattern
      if (emailRegex.test(username)) {
        return "email";
      } else if (phoneRegex.test(username)) {
        return "phone";
      } else {
        return "invalid";
      }
    }

    function convertToUsername(username: string) {
      return crypto.createHash('sha256').update(username).digest('hex');
    }
  
  export const getotpforusername = async (req: Request, res: Response) => {
      User.sync();
      //input username
      const username = convertToUsername(req.body.fdata.username);
      const otp = Math.floor(100000 + Math.random() * 900000); 
      const now = new Date();
      const otp_expiry = new Date(now.getTime() + 5*60000); 
      console.log(username);
      if(validateEmailOrPhoneNumber(req.body.fdata.username) == 'phone'){
        const phone = req.body.fdata.username;
        const existingUser = await User.findOne({ 
          where: { 
              username:username,
              phone: phone              
        } });  
        if (existingUser) {
          await User.update(
            { otp: otp,
              otp_expiry:otp_expiry },
            { where: { phone: phone ,
              username: username
            } }
          );
          return res.status(200).json({ Message: 'OTP Resent to Phone!' });
        }  else{
          try  {
            const newUser = await User.create( {username ,phone,otp, otp_expiry} );
               
                return res.status(200).json(newUser);
              }catch (error) {
                console.error(error);
              return res.status(500).json({ error: 'Error creating user' });
            }
        } 
      }            
      else (validateEmailOrPhoneNumber(req.body.fdata.username) == 'email'){
        const email = req.body.fdata.username;
        const existingUser = await User.findOne({ 
          where: { 
              username:username,
              email: email              
        } }); 
        if (existingUser) {
          await User.update(
            { otp: otp,
              otp_expiry:otp_expiry },
            { where: { email: email ,
              username: username
            } }
          );
          return res.status(200).json({ Message: 'OTP Resent to Phone!' });
        }else{
          try  {
            const newUser = await User.create( {username,email,otp,otp_expiry} );
               
                return res.status(200).json(newUser);
              }catch (error) {
                console.error(error);
              return res.status(500).json({ error: 'Error creating user' });
            }
        }
      } 
  }

export const verifyemailandsendotp = async(req:Request, res:Response) => {
    User.sync();
    let emailstatus = '';
    const email = req.body.fdata.email;
    const otp = req.bod
    const existingUser = await User.findOne({
      where:{
        email:email
      }
    })

    if(existingUser){
      mailer(email,otp);
      const otp_insert_for_email = await User.update(
        {otp:otp},
        {where: {email:email}}
      );
      emailstatus= 'exist';
    }else {
      const is_registered =0;
      mailer(email,otp);

      const email_and_otp_insert = await User.update(
        {otp:otp,
        is_registered:is_registered},
        {where:{email:email}}
      )
    }

    
    
}





function mailer(email: any, otp: number) {
 
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



