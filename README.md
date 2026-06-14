# MERN Stack Authentication System

A secure, full-stack Authentication and Authorization application built using the MERN stack (MongoDB, Express, React, Node.js). This project implements secure user signup, login, and verification features alongside automated email communication.

---

## 🚀 Features

*   **Secure Authentication:** User registration and login utilizing encrypted passwords.
*   **Email Verification:** Automated email delivery for verification codes using **Nodemailer**.
*   **State Management & Routing:** Client-side routing managed securely within React (Vite).
*   **Environment Security:** Complete separation of configuration settings from the codebase.

---

## 🛠️ Tech Stack

### Backend
*   **Node.js & Express:** Server runtime and framework.
*   **MongoDB:** Database storage for user credentials.
*   **Nodemailer:** Automated email delivery for verification processes.

### Frontend
*   **React (Vite):** Fast, optimized frontend build tool and library.
*   **Tailwind CSS:** Modern utility-first styling.

---

## 📁 Project Structure

```text
MERN AUTH/
├── client/           # React frontend (Vite)
│   ├── src/          # Source files
│   └── .gitignore    # Client-specific ignores
├── server/           # Node.js backend
│   ├── config/       # Database configuration
│   ├── controllers/  # Logic handlers
│   ├── models/       # MongoDB schemas
│   └── .gitignore    # Server-specific ignores
└── .gitignore        # Root-level fallback ignore

⚙️ Installation & Setup
To run this project locally, follow these steps:

1. Clone the Repository
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd "MERN Auth"
2. Configure Environment Variables
To protect application credentials, never expose real keys. Create a .env file in the server directory based on the template below:

Create server/.env:
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_key_here
NODE_MAILER_USER=your_email@example.com
NODE_MAILER_PASSWORD=your_app_specific_password_here

3. Install Dependencies & Run
Setup Server:
cd server
npm install
npm start

Setup Client:
cd ../client
npm install
npm run dev
