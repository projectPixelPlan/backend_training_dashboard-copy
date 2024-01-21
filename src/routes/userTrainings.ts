import express from 'express'
import { Request,Response} from 'express'
import getUserTrainings from '../controllers/userTrainings/getUserTrainings'

const userTrainingRouter=express.Router()

userTrainingRouter.get('/getUserTrainings', async(req:Request,res:Response)=>{
    getUserTrainings(req,res)
})

export default userTrainingRouter