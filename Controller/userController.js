import messDate from '../Models/userModels.js';
import contactUser from '../Models/userContactData.js';
import logData from '../Models/logModel.js';
export const create = async(req,res)=>{
    try{
    const userDetails = new messDate(req.body);
    await userDetails.save();
    res.status(200).json({userDetails})
    }
    catch{
        res.status(500).json({message:'Internal Error'})
    }
}

export const fetch = async(req,res) => {
    try{
        const userData=await messDate.find({});
        res.json(userData);
    }
    catch
    {
        res.status(400).json({message:'Error in fetching'});
    }
}
export const login = async(req,res)=>{
   try
   {
        const {username,password, day} = req.body;
        logData.create({username:username,dateAndTime:day});
        const userDet = await contactUser.find({username,password});
        if(userDet.length==0)
            return res.status(401).json({message:"Invalid data"});
        else
        return res.status(200).json(userDet);
       
   }
   catch(error){
     console.log(error);
   } 
    
}
export const register = async(req,res)=>{
    try
    {
        const {username,password} = req.body;
        contactUser.find({username})
        .then((data)=>{
            if(data.length==0){
                const userDet = contactUser.create({username:username,password:password});
                return res.status(200).json(userDet);
            }
            else{
                return res.status(500).json({message:"error"});
            }
        });
        // console.log(dataDetails);
        
        
    }
    catch(error){
      console.log(error);
    } 
     
 }