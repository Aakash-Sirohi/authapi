import express, { Request, Response } from 'express';
import User from '../models/Users';
import router from '../routes/routes';
import { Where } from 'sequelize/types/utils';

  
  export const getotp = async (req: Request, res: Response) => {
      User.sync();
      const otp = Math.floor(100000 + Math.random() * 900000);
      console.log(req.body.fdata.phone);
      const phone = req.body.fdata.phone;
      const existingUser = await User.findOne({ where: { phone } });
      
      if (existingUser) {
        return res.status(409).json({ error: 'A user with this phone number already exists' });
      }
    
      
      // res.status(201).json(user.get(phone));
      try  {
    const newUser = await User.create( {phone} );
        return res.status(201).json(newUser);
      }catch (error) {
        console.error(error);
      return res.status(500).json({ error: 'Error creating user' });
    }
  }




