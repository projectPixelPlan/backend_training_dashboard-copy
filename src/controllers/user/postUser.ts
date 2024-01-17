import { NextFunction, Request,Response } from "express"
import axios from "axios";
import User from "../../models/user";

let  graphMeEndpoint:string=
"https://graph.microsoft.com/v1.0/me?$select=id,department,employeeId,givenName,surName,userPrincipalName,jobTitle";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const postUser =async(req:Request,res:Response)=>{

try{

const token =req.headers.authorization
    
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - Token not provided' });
    }    
 

    const response=await axios.get(graphMeEndpoint,{
        headers:{
            Authorization: token
        }
    })
    let user={
        ssoId:response.data.id,
        employeeId:response.data.employeeId || Math.floor(Math.random()*1000),
        email:response.data.userPrincipalName,
        firstName:response.data.givenName,
        lastName:response.data.surName || "no name",
        jobTitle:response.data.jobTitle || "test dev",
        department:response.data.department || "test",
        isActive:true,
        
    }
    try {
         await User.create(user);
         res.status(201).json({ success: true, message:"user added successfully" });
      } catch (error) {
        
        console.error('Error creating user:', error);
        throw error;
      }

}catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ valid: false, error: 'Invalid token' });
  }


}

export default postUser