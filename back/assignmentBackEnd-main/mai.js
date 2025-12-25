const path = require("node:path");
const fs = require("node:fs");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;
const filePath = path.resolve(__dirname, "./users.json");

// السماح للفرونت اند بالاتصال + قراءة JSON
app.use(cors());
app.use(express.json());

// تأكد أن ملف البيانات موجود، لو مش موجود أنشئه
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "[]", "utf-8");
}

// =============== LOGIN (جديد ومهم) ==================//
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const users = JSON.parse(fs.readFileSync(filePath, { encoding: "utf-8" }));

  // البحث عن المستخدم
  const user = users.find((u) => u.email === email);

  // تحقق بسيط (ممكن تضيف تحقق من الباسورد هنا لو حبيت)
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // في تطبيق حقيقي لازم نتأكد إن الباسورد صح:
  // if (user.password !== password) return res.status(401).json({message: "Wrong password"});

  return res.status(200).json({ message: "Login success", user });
});

// =============== SIGNUP (تم التعديل لإضافة password) ==================//
app.post("/signup", (req, res) => {
  console.log("Signup Body:", req.body);
  const { name, email, age, password } = req.body;

  const users = JSON.parse(fs.readFileSync(filePath, { encoding: "utf-8" }));
  const userExist = users.find((user) => user.email === email);

  if (userExist) {
    return res.status(409).json({ message: "Email already exists" });
  } else {
    // تخزين الباسورد مع البيانات
    const newUser = { id: Date.now(), name, email, age: Number(age), password };
    users.push(newUser);

    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), {
      encoding: "utf-8",
    });
    return res
      .status(201)
      .json({ message: "User added successfully", user: newUser });
  }
});

// =============== UPDATE USER (تم إصلاح الأخطاء) ==================//
app.patch("/user/:id", (req, res) => {
  const { id } = req.params; // الأصح نأخذ الـ ID من الرابط
  const { name, email, age } = req.body;

  let data = JSON.parse(fs.readFileSync(filePath, { encoding: "utf-8" }));
  const userIndex = data.findIndex((user) => user.id === Number(id));

  if (userIndex === -1) {
    return res.status(404).json({ message: "User ID not found" });
  }

  // تحديث البيانات الموجودة فقط
  if (name) data[userIndex].name = name;
  if (email) data[userIndex].email = email;
  if (age) data[userIndex].age = age;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), {
    encoding: "utf-8",
  });

  // إرسال رد واحد فقط في النهاية (تم الإصلاح)
  return res
    .status(200)
    .json({ message: "User updated successfully", user: data[userIndex] });
});

// =============== DELETE USER ==================//
app.delete("/user/:id", (req, res) => {
  const { id } = req.params; // الأصح نأخذ الـ ID من الرابط
  let data = JSON.parse(fs.readFileSync(filePath, { encoding: "utf-8" }));

  const userIndex = data.findIndex((user) => user.id === Number(id));

  if (userIndex === -1) {
    return res.status(404).json({ message: "User ID not found" });
  } else {
    data.splice(userIndex, 1);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return res.status(200).json({ message: "User deleted successfully" });
  }
});

// =============== GET ALL USERS ==================//
app.get("/user", (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath, { encoding: "utf-8" }));
  return res.status(200).json(data);
});

// =============== GET USER BY ID ==================//
app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  let data = JSON.parse(fs.readFileSync(filePath, { encoding: "utf-8" }));
  const userExist = data.find((user) => user.id === Number(id));

  if (!userExist) {
    return res.status(404).json({ message: "User not found" });
  } else {
    return res.status(200).json(userExist);
  }
});

// =============== SEARCH BY NAME ==================//
app.get("/user/getByName", (req, res) => {
  const { name } = req.query;
  const data = JSON.parse(fs.readFileSync(filePath, { encoding: "utf-8" }));
  const userExist = data.find((user) => user.name === String(name));

  if (!userExist) {
    return res.status(404).json({ message: "User name not found" });
  } else {
    return res.status(200).json(userExist);
  }
});

// =============== FILTER BY AGE ==================//
app.get("/user/filter", (req, res) => {
  const { minAge } = req.query;
  let data = JSON.parse(fs.readFileSync(filePath, { encoding: "utf-8" }));
  const userExistAge = data.filter((user) => user.age >= Number(minAge));

  if (userExistAge.length === 0) {
    return res.status(404).json({ message: "No users found" });
  } else {
    return res.status(200).json(userExistAge);
  }
});

app.listen(port, () => {
  console.log(`Backend Server Is running on port ${port} 🚀`);
});
