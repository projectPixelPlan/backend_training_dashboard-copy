import { NextFunction,urlencoded } from 'express';
import { Request, Response   } from 'express';
const passport = require('passport');
const passportAzureAd = require('passport-azure-ad');

const jwtVerification= async (req:Request,res:Response,next:NextFunction)=>{
 
    try{
        let token  = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized - Token not provided' });
        }    
        let processedToken = token.split('Bearer ')[1];



    }
    catch (error) {
        console.error('Error making API request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}





