import express, { Request, Response } from 'express';
import User from '../models/Users';
import router from '../routes/routes';
import { Where } from 'sequelize/types/utils';

  
  const otp = Math.floor(100000 + Math.random() * 900000);  
  export const getotpforphone = async (req: Request, res: Response) => {
      User.sync();
      
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
    
}



