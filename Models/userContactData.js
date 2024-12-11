import mongoose from 'mongoose';

const contact=new mongoose.Schema({
    username:{
        type:String
    },
    password:{
        type:String
    }
});
export default mongoose.model('userdatas',contact);