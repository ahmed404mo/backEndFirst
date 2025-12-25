// ===============
const path = require("node:path");
const fs = require("node:fs");
// const dataPath = fs.createReadStream(path.resolve("./users.json"));
const express = require("express");
const cors = require("cors")
// ===============
const app = express();
const port = 3000;
const filePath = path.resolve("./users.json");
// ===============
app.use(express.json(), cors());
// ===============SIGNUP==================//
app.post("/signup", (req, res, next) => {
  console.log({ body: req.body });
  const { name, email, age } = req.body;
  const users = JSON.parse(fs.readFileSync(filePath, { encoding: "utf-8" }));
  const userExist = users.find((user) => user.email === email);
  if (userExist) {
    return res.status(409).json({ message: "Email already exists" });
  } else {
    users.push({ id: Date.now(), name, email, age });
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), {
      encoding: "utf-8",
    });
    return res.status(201).json({ message: "user added succesfully", users });
  }
});

// ===============USR:ID==================//
app.patch("/user/:id", (req, res, next) => {
  console.log({ body: req.body });
  const { id, name, email, age } = req.body;
  const data = JSON.parse(fs.readFileSync(filePath, { encoding: "utf-8" }));
  const user = data.find((user) => user.id === Number(id));
  if (!user) {
    return res.status(409).json({ message: "user ID not found" });
  } else {
    if (user && name) {
      user.name = name;

      res.status(201).json({ message: "user name is updated successfully" });
    }
    if (user && email) {
      user.email = email;

      res.status(201).json({ message: "user email is updated successfully" });
    }

    if (user && age) {
      user.age = age;
      res.status(201).json({ message: "user age is updated successfully" });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), {
      encoding: "utf-8",
    });
  }
});
// ===============
// ===============/user{/:id}==================//
app.delete("/user/:id", (req, res, next) => {
  console.log({ body: req.body });
  let data = JSON.parse(fs.readFileSync(filePath, { encoding: "utf-8" }));
  const { id } = req.body;
  const user = data.findIndex((user) => user.id === Number(id));
  if (user === -1) {
    return res.status(404).json({ message: "user ID not found" });
  } else {
    data.splice(user, 1);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return res.status(200).json({ message: "user deleted successfully" });
  }
});
// ===============/user/getByName==================//
app.get("/user/getByName", (req, res, next) => {
  console.log({ body: req.body });
  // const {id, name, email, age} = req.body
  const { name } = req.query;
  console.log(name);

  const data = JSON.parse(fs.readFileSync(filePath, { encoding: "utf-8" }));
  const userExist = data.find((user) => user.name === String(name));
  if (!userExist) {
    return res.status(404).json({ message: "User name not found" });
  } else {
    return res.status(200).json(userExist);
  }
});
// ===============GET /user==================//
app.get("/user", (req, res, next) => {
  console.log({ body: req.body });
  const {id, name, age, email} = req.body;
  const data = JSON.parse(fs.readFileSync(filePath, {encoding:"utf-8"}))
  return res.status(200).json(data)
});
// ===============/user/filter==================//
app.get("/user/filter",(req,res,next)=>{
  const {minAge} = req.query
  console.log({age:minAge});
  let data = JSON.parse(fs.readFileSync(filePath,{encoding:"utf-8"}))
  const userExistAge = data.filter(user=>user.age >= Number(minAge))
  if (userExistAge.length === 0) {
    return res.status(404).json({message:"no user found"})
  } else {
    return res.status(200).json(userExistAge)
  }
  
})
// ===============/user/:id==================//
app.get("/user/:id",(req,res,next)=>{
  console.log({id:req.params});
  const {id} = req.params
  let data = JSON.parse(fs.readFileSync(filePath, {encoding:"utf-8"}))
  const userExist = data.find(user=>user.id === Number(id))
  if (!userExist) {
    return res.status(404).json({message:"user not found"})
  } else {
    return res.status(200).json(userExist)
  }
})
// ===============
app.listen(port, "127.0.0.1", 511, () => {
  console.log(`Server Is runing on port ${port} 🚀`);
});
