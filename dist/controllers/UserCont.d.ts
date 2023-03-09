import express, { Request, Response } from 'express';
export declare const getotpforusername: (req: Request, res: Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
export declare const verifyOtpForUsername: (req: Request, res: Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
export declare const loginWithSignup: (req: Request, res: Response) => Promise<void>;
