🛡️ SecureAuth System

A modern, secure, and interactive authentication platform built with Next.js and Node.js.

📖 Overview

SecureAuth is a full-stack authentication solution designed to demonstrate best practices in frontend security and modern UI design. It features a complete user lifecycle (Sign Up, Login, Update, Delete) with a heavy focus on Input Sanitization to prevent common web attacks (like XSS and Injection) by strictly filtering special characters.

The interface is built with a stunning Glassmorphism aesthetic, smooth animations, and real-time feedback using Toast notifications.

✨ Key Features

🔒 Security & Logic

Strict Input Sanitization: Automatically strips dangerous characters (e.g., #, $, <, >) from input fields to prevent SQL Injection and XSS attacks.

Session Management: Persists user state using localStorage with hydration handling in Next.js.

Protected Routes: Restricts access to the dashboard for authenticated users only.

🎨 UI/UX Design

Modern Glassmorphism: High-quality frosted glass effects using Tailwind CSS backdrop-blur.

Interactive Dashboard: Users can view their profile, update details, or delete their account.

Visual Feedback: Real-time Toast notifications for success, error, and warning states.

Responsive: Fully optimized for Desktop, Tablet, and Mobile.

Animations: Smooth transitions and entrance animations.

🛠️ Tech Stack

Frontend: Next.js 13+ (App Router), React.js

Styling: Tailwind CSS

Icons: Lucide React

Backend: Node.js, Express.js

Database: JSON File System (Simulated DB for demo purposes)

🚀 Getting Started

Follow these steps to run the project locally.

Prerequisites

Node.js installed on your machine.

1. Clone the Repository

git clone [https://github.com/your-username/secure-auth-system.git](https://github.com/your-username/secure-auth-system.git)
cd secure-auth-system


2. Setup the Backend

Navigate to the server file and install dependencies (if separated) or run the Node server:

# Assuming backend logic is in a file named server.js
node server.js


The server should run on http://localhost:3000.

3. Setup the Frontend (Next.js)

Open a new terminal and run:

npm install
npm run dev


Open http://localhost:3001 (or the port shown in your terminal) to view the app.

📡 API Endpoints

The frontend communicates with a Node.js backend via the following endpoints:

Method

Endpoint

Description

POST

/signup

Create a new user account

POST

/login

Authenticate user & receive session data

PATCH

/updata

Update user profile (Name, Email, Password)

DELETE

/delete

Permanently delete user account

🛡️ Security Implementation Example

Here is how we handle input sanitization on the client side to protect data integrity:

const sanitizeInput = (value) => {
  // Removes special characters often used in exploits
  return value.replace(/[#$<>&"']/g, "");
};


🤝 Contributing

Contributions, issues, and feature requests are welcome!

📝 License

This project is MIT licensed.

Made with ❤️ by Ahmed Mokhtar
