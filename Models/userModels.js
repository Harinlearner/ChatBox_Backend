import mongoose from "mongoose"

const userSchemaNew = new mongoose.Schema({
    person1:{
        type:String,
        required:true
    },
    person2:{
        type:String,
        required:true
    },
    convo:[
        {
            person:{
                type:String,
            },
            personConvo:{
                type:String,
            }
        }
    ]
});
export default mongoose.model('conversations',userSchemaNew);