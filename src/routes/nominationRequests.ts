import express from 'express'
import { Request,Response} from 'express'
import postNominationRequests from '../controllers/nominationRequests/postNominationRequests'
// import getNominationRequests from '../controllers/nominationRequests/getNominationRequests'
import deleteNominationRequests from '../controllers/nominationRequests/deleteNominationRequests'

const nominationRouter=express.Router()

nominationRouter.post('/postNominationRequests', async(req:Request,res:Response)=>{
    postNominationRequests(req,res)
})

// nominationRouter.get('/getNominationRequests', async(req:Request,res:Response)=>{
//     getNominationRequests(req,res)
// })

nominationRouter.put('/deleteNominationRequests', async(req:Request,res:Response)=>{
    deleteNominationRequests(req,res)
})

export default nominationRouter