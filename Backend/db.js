const mongoose=require("mongoose")
const dotenv=require('dotenv')

dotenv.config()

const mongo_uri=process.env.MONGO_URI

mongoose.connect(mongo_uri).then(()=>{
    console.log("connected successfully")
}).catch((err)=>{
console.log(err)
})

const userSchema=mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String,
        unique:true
    },
    password:{
        required:true,
        type:String
    }
})
const taskSchema=mongoose.Schema({
    title:{
        required:true,
        type:String
    },
    status:{
        required:true,
        type:String,
        enum: ["pending", "completed"], 
    default: "pending",
        
    },
    priority:{
        required:true,
        type:String,
        enum:["low","medium","high"],
        default:"low"
    },
   deadline: {
required:true,
type:String
    },
    user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
}


})

module.exports ={
     User: mongoose.model('users', userSchema),
     Task:mongoose.model('tasks',taskSchema)
}