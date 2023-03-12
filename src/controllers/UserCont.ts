import express, { Request, Response } from 'express';
import User from '../models/Users';
import router from '../routes/routes';
import { Where, now } from 'sequelize/types/utils';
import nodemailer from 'nodemailer'; 
import crypto from 'crypto';
import session from 'express-session';
import { app } from '../server';

app.use(session({
  secret: 'abrakadabra',
  resave: false,
  saveUninitialized: false
}));
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
            const userWithoutOTP = {
              username:newUser.username,
              phone:newUser.phone,
              otp_expiry:otp_expiry
            };
                return res.status(200).json({
                  user : userWithoutOTP
                });
              }catch (error) {
                console.error(error);
              return res.status(500).json({ error: 'Error creating user' });
            }
        } 
      }            
      else if (validateEmailOrPhoneNumber(req.body.fdata.username) == 'email') {
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
        const userWithoutOTP = {
          username:newUser.username,
          phone:newUser.phone,
          otp_expiry:otp_expiry
        };
            return res.status(200).json({user : userWithoutOTP});
          }catch (error) {
            console.error(error);
          return res.status(500).json({ error: 'Error creating user' });
        }
    }
      }
  }

export const verifyOtpForUsername = async(req:Request, res:Response) => {
    User.sync();
    let emailstatus = '';
    const input_user = req.body.fdata.username;
    const username = convertToUsername(input_user);
    const otp = req.body.fdata.otp;
    const existingUser = await User.findOne({
      where:{
        username:username,
        otp:otp
      }
    })
    
    if(existingUser){
      const is_verified = 1;
      await User.update(
        {is_verified:is_verified},
        {where :{username:username}}
      );
      req.session.user = username;
      const user = await User.findOne({
        where: { username },
        attributes: ["is_registered"],
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      } 
      
      return res.status(200).json({message:'User Authenticated!',is_registered:user.is_registered})
    } else res.status(400).json({message:"Incorrect OTP, Unable to Authenticate User!"})

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

export const loginWithSignup = async (req:Request,res:Response) => {
 const vres = verifyOtpForUsername(req,res);
 console.log(vres); 
}

