import express, { Request, Response } from 'express';
export declare const getotpforphone: (req: Request, res: Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const getotpforemail: (req: Request, res: Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const verifyemailandsendotp: (req: Request, res: Response) => Promise<void>;
