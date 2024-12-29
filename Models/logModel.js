import mongoose from 'mongoose';

const log= mongoose.Schema({
    
    username:{
        type:String,
        required:true
    },
    dateAndTime:{
        type:String,
        required:true
    }
});

export default mongoose.model('logdatas',log);