const fs = require("node:fs");
const path = require("node:path");
const pathFile = path.resolve("./data.json");
const express = require("express");
const cors = require("cors");
const port = 3001;
const app = express();
app.use(express.json(), cors());

app.post("/signup", (req, res, next) => {
  console.log({ body: req.body });
  const { name, email, password } = req.body;
  let data = JSON.parse(fs.readFileSync(pathFile, { encoding: "utf-8" }));
  const checkData = data.find((user) => user.email == email);
  if (checkData) {
    return res.status(409).json({ message: "account is exist aleardy" });
  } else {
    let newUser = { id: Date.now(), name, email, password };
    data.push(newUser);
    fs.writeFileSync(pathFile, JSON.stringify(data, null, 2));

    return res
      .status(200)
      .json({ message: "Signup successfly 🌸", user: checkData });
  }
});
app.post("/login", (req, res, next) => {
  console.log({ body: req.body });
  const { email } = req.body;
  let data = JSON.parse(fs.readFileSync(pathFile, { encoding: "utf-8" }));
  const checkData = data.find((user) => user.email == email);
  if (!checkData) {
    return res.status(409).json({ message: "account not found please signup" });
  } else {
    // fs.writeFileSync(pathFile,JSON.stringify(data,null, 2))

    return res
      .status(200)
      .json({ message: "login is successfly 🌸", user: checkData });
  }
});

app.patch("/updata", (req, res, next) => {
  const { id, name, email, password } = req.body;
  let data = JSON.parse(fs.readFileSync(pathFile, { encoding: "utf-8" }));
  const checkId = data.findIndex((user) => user.id == id);
  if (checkId === -1) {
    return res.status(409).json({ message: "account not found please signup" });
  } else {
    if (name) {
      data[checkId].name = name;
    }
    if (email) {
      data[checkId].email = email;
    }
    if (password) {
      data[checkId].password = password;
    }
    fs.writeFileSync(pathFile, JSON.stringify(data, null, 2));
    return res.status(200).json({ message: "updated is successfly 🌸" });
  }
});
app.delete("/delete", (req, res, next) => {
  const { id, name, email, password } = req.body;
  let data = JSON.parse(fs.readFileSync(pathFile, { encoding: "utf-8" }));
  const checkId = data.findIndex((user) => user.id == id);
  if (checkId === -1) {
    return res.status(409).json({ message: "account not found please signup" });
  } else {
    data.splice(data[checkId], 1);
    fs.writeFileSync(pathFile, JSON.stringify(data, null, 2));
    return res.status(200).json({ message: "delete is successfly 🌸" });
  }
});

app.listen(port, () => {
  console.log(`Server is runing on port ${port} 🚀`);
});
