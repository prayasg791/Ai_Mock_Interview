//model folder contains all the database schema and model related to the project
const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"Username Already taken"],
        required:true,
    },
    email:{
      type:String,
        unique:[true,"Acount Already Exist"],
        required:true,
    },
    password:{
      type:String,
      required:true
    }
})

const userModel=mongoose.model("users",userSchema);
module.exports=userModel;