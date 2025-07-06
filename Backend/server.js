const express=require('express')
const dotenv=require('dotenv')
const {User,Task}=require('./db')
const bcrypt=require('bcryptjs')
const authmiddleware=require('./authMiddleware')
const cors=require("cors")
const app=express()
const jwt=require('jsonwebtoken')
app.use(express.json())
app.use(cors())
dotenv.config()
const port=process.env.PORT
const secret_key=process.env.SECRET_KEY

app.get('/',(req,res)=>{
    res.send("hello")
})

app.post('/task',authmiddleware,async(req,res)=>{
    const{title,priority,status,deadline}=req.body
    const task=await Task.create({
        title,
        priority,
        status,
        deadline,
        user:req.user.id
    })
    res.json(task)
})

app.get('/task', authmiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks", error: err.message });
  }
});


app.post('/register',async(req,res)=>{
   try{ const {name,email,password}=req.body;
    const salt= await bcrypt.genSalt(10)
const hash = await bcrypt.hash(password, salt);
const user=await User.findOne({email})
if(user){
    return res.status(401).json({message:"user already exists"})
}
const newuser=await User.create({
    name,email,password:hash
})
res.json(newuser)
   }catch(err){
    console.log(err)
   }
})

app.post('/login',async(req,res)=>{
    const {email,password}=req.body
    const user= await User.findOne({email})
    if(!user) return res.send('user not found')
    const compare=await bcrypt.compare(password,user.password
     );
     if(!compare) return res.send("invalid password")
     

    const token = jwt.sign(
          {
            id: user._id,
            email: user.email,
            name: user.name
          },
          secret_key,
          { expiresIn: '30d' }
        );
    
      res.json({ message: "Login successful",token, user });
})

app.patch('/task/:id',authmiddleware,async(req,res)=>{
try{const updates=req.body
const task=await Task.findOneAndUpdate({_id:req.params.id,user:req.user.id},
  updates,{
    new:true
  }
)
res.json(task)
}catch(err){
  res.status(500).json({message:"server error"})
}
})


app.delete("/task/:id",authmiddleware,async(req,res)=>{
const task= await Task.findOneAndDelete({_id:req.params.id,user:req.user.id})
res.json({task,message:"deleted successfully"})
})

app.get("/task/:id", authmiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    console.log(req.user.id)
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


app.listen(port,()=>{
    console.log(`hello  http://localhost:${port}`)
})
