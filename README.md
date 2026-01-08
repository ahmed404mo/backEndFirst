
<p align="center">
  <img src="https://img.icons8.com/fluency/96/security-checked.png" alt="SecureAuth Logo"/>
  <h1 align="center">🛡️ SecureAuth System</h1>
  <p align="center">A modern, secure, and interactive authentication platform built with <b>Next.js</b> and <b>Node.js</b></p>
</p>

---

## 📖 Overview

**SecureAuth** is a full-stack authentication solution designed to demonstrate **best practices** in frontend security and modern UI design.  
It includes the complete user lifecycle:

✅ Sign Up  
✅ Login  
✅ Update Profile  
✅ Delete Account  

Focuses heavily on **Input Sanitization** to prevent common web attacks like **XSS** and **SQL Injection**.

The interface features **Glassmorphism design**, smooth animations, and real-time **Toast notifications**.

---

## ✨ Key Features

### 🔒 Security & Logic
- **Strict Input Sanitization:** Automatically strips dangerous characters (`#`, `$`, `<`, `>`) from input fields.  
- **Session Management:** Persists user state using `localStorage` with hydration handling in Next.js.  
- **Protected Routes:** Dashboard accessible **only** to authenticated users.

### 🎨 UI/UX Design
- **Modern Glassmorphism:** Frosted glass effects using Tailwind CSS `backdrop-blur`.  
- **Interactive Dashboard:** View profile, update details, or delete account.  
- **Visual Feedback:** Real-time Toast notifications for success, error, and warnings.  
- **Responsive Design:** Optimized for Desktop, Tablet, and Mobile.  
- **Smooth Animations:** Elegant transitions and entrance effects.

---

## 🛠️ Tech Stack

| Layer      | Technology |
|------------|------------|
| Frontend   | Next.js 13+, React.js |
| Styling    | Tailwind CSS |
| Icons      | Lucide React |
| Backend    | Node.js, Express.js |
| Database   | JSON File System (Simulated DB) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed on your machine.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/secure-auth-system.git
cd secure-auth-system
````

### 2️⃣ Setup the Backend

```bash
# Assuming backend logic is in server.js
node server.js
```

Backend runs on [http://localhost:3000](http://localhost:3000)

### 3️⃣ Setup the Frontend

```bash
npm install
npm run dev
```

Frontend runs on [http://localhost:3001](http://localhost:3001) (or the port shown in your terminal)

---

## 📡 API Endpoints

| Method | Endpoint | Description                                 |
| ------ | -------- | ------------------------------------------- |
| POST   | /signup  | Create a new user account                   |
| POST   | /login   | Authenticate user & receive session data    |
| PATCH  | /updata  | Update user profile (Name, Email, Password) |
| DELETE | /delete  | Permanently delete user account             |

---

## 🛡️ Security Implementation Example

```javascript
const sanitizeInput = (value) => {
  // Removes special characters often used in exploits
  return value.replace(/[#$<>&"']/g, "");
};
```

This ensures **data integrity** and protects the app from malicious inputs.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to open a **pull request** or **issue**.

---

## 📝 License

This project is licensed under **MIT**.

Made with ❤️ by **Ahmed Mokhtar**

```
