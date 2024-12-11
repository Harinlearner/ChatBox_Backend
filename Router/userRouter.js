import express from "express";
import messDate from '../Models/userModels.js';
import contactUser from '../Models/userContactData.js';
import mongoose from 'mongoose';
import {login, register} from '../Controller/userController.js'
const ObjectId = mongoose.Types.ObjectId;
const route = express.Router();
import {create} from '../Controller/userController.js'
route.post('/create',create);
route.get('/fetch/:userName',(req,res)=>{
    const {userName}=req.params;
    // console.log(userName);
    messDate.find({
        $or :
            [
                { person1: userName },
                { person2 : userName }
            ]
    })
    .then((convo)=>res.json(convo))
    .catch((error)=>res.status.json(error))
});
route.put('/update/:id',(req,res)=>{
    let {id} = req.params;
    let {updatedMessage,personCon} = req.body;
    messDate.findByIdAndUpdate(
        id,
            {$push:{convo:{ _id: new ObjectId(),person:personCon,personConvo:updatedMessage}}},
            {new:true}
    )
    .then((conv)=>res.json(conv))
    .catch((error)=>res.status.json(error))
});
route.post('/addConvo',(req,res)=>{
    const {person1,person2} = req.body;
    // let flag=[];
    messDate.find({
        $or :
            [
                { person1: person1,person2:person2 },
                { person1: person2,person2:person1 }
            ]
    })
    .then((data)=>{
        if(data.length==0)
        {
            messDate.create({person1:person1,person2:person2,convo:[
                {person:person1,personConvo:"Hi"}
            ]})
            .then((cons)=>res.status(200).json(cons.data));   
        }
        else{
            res.status(500).json({message:"Error"});
        }
    });
    // console.log(flag.length);
    // if(flag)
    // {
    //     console.log(flag);
    
});
route.get('/contactFetch',(req,res)=>{
    contactUser.find({})
    .sort({username:1})
    .then((conts)=>res.json(conts));
});
route.post('/login',login);
route.post('/register',register);
export default route;
