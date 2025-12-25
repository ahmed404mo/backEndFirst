//  import node module
const path = require("node:path")
const fs = require("node:fs")
// import local module
const express = require("express")
const cors = require("cors")
// import File Path & port
const filePath = path.resolve("./users.json")
const port = 3000
// Create Server Express
const app = express()

app.use(express.json(), cors())
//  ============= signup ===========
app.post("/signup",(req,res, next)=>{
  const {email, name, password} = req.body
  const data = JSON.parse(fs.readFileSync(filePath,{encoding:"utf-8"}))
  let userExist = data.find(user=>user.email === email)
  if (userExist) {
    return res.status(409).json({message:"email already is exist"})
  } else {
    let newUser = {id:Date.now(),name, email, password}
    data.push(newUser)
    fs.writeFileSync(filePath, JSON.stringify(data,null,2))
    
    return res.status(200).json({message:"Signup is successfuly"})
  }
})

//  ============= login ===========
app.post("/login",(req,res, next)=>{
  console.log({body:req.body});
  
})

app.listen(port, "127.0.0.1",511,()=>{
  console.log(`Server is runing on port ::: ${port} 🚀`);
  
})