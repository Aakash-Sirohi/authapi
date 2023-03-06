import express, { Request, Response } from 'express';
export declare const getotp: (req: Request, res: Response) => Promise<express.Response<any, Record<string, any>>>;
