import { Router, Request, Response } from 'express';
import Users from '../models/Users';
// import getotp from '../../api/auth/getotp';
import { getotpforusername, verifyemailandsendotp} from '../controllers/UserCont';
import { request } from 'http';
import { Message } from 'twilio/lib/twiml/MessagingResponse';

const router  = Router ();

router.get('/', async (req: Request, res: Response)=>{
    try{
        await Users.sync();
        debugger;
        // const data = await Users.findAll();
        console.log('tyring to send resposne');
        res.send("Table created");
        res.status(500);
                      
    }catch(error){
        console.error(error);
        res.status(500).json({error});
    }
})

router.post('/getotp', async (req,res)=>{
    const username = req.body.fdata;
    await getotpforusername(req,res);
    });

router.post('/verifyotp' , async (req,res)=>{
    await verifyemailandsendotp(req,res);
})

export default router;