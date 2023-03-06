import { Router, Request, Response } from 'express';
import Users from '../models/Users';
// import getotp from '../../api/auth/getotp';
import {getotp} from '../controllers/UserCont';
import { request } from 'http';

const router  = Router ();

router.get('/',async (req: Request, res: Response)=>{
    try{
        await Users.sync();
        debugger;
        // const data = await Users.findAll();
        console.log('tyring to send resposne');
        res.send("Table created");
        res.status(500).json();
               
    }catch(error){
        console.error(error);
        res.status(500).json({error});
    }
})

router.post('/getotp', (req,res)=>{
    const {phone} = req.body.fdata.phone;
    const otp = getotp(req,res);
    res.send({otp})
})

export default router;