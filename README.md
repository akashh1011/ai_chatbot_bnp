# 🤖 AI Chatbot (MERN Stack)

A professional full-stack generative AI chatbot application built using the **MERN** (MongoDB, Express, React, Node.js) stack. This project features real-time AI communication, secure user authentication, and persistent multi-session chat history.



## ✨ Features

* **Secure Authentication**: User signup and login with hashed passwords (bcrypt) and JWT tokens.
* **Multi-Chat Management**: Create, view, and delete multiple independent chat sessions.
* **Persistent History**: All conversations are saved in MongoDB and can be retrieved later.
* **AI Integration**: Powered by OpenAI's GPT-3.5-turbo for intelligent, human-like responses.
* **MVC Architecture**: Backend organized into Models, Views, and Controllers for scalability.
* **Modern UI**: Responsive design built with Tailwind CSS and Lucide React icons.

## 🛠️ Tech Stack

**Frontend:**
* React.js
* Tailwind CSS
* Lucide React (Icons)

**Backend:**
* Node.js & Express.js (ES Modules)
* MongoDB & Mongoose
* OpenAI API
* JSON Web Tokens (JWT)

---

## 🚀 Getting Started

### 1. Prerequisites
* Node.js (v16 or higher)
* MongoDB Atlas Account
* OpenAI API Key

### 2. Environment Setup
Create a `.env` file in the **server** directory:
```text
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
OPENAI_API_KEY=your_openai_api_key

### 3. Installation

**Install Backendnpmpendencies:**
```bash
cd server
npm install

**Install Frontend Dependencies:**
```bash
cd client
npm install
## 🛡️ API Endpoints

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| POST | `/api/auth/signup` | Register a new user | No |
| POST | `/api/auth/login` | Login & get JWT token | No |
| GET | `/api/chat/all` | Fetch all chat sessions | Yes |
| POST | `/api/chat/new` | Create a new session | Yes |
| POST | `/api/chat` | Send prompt to OpenAI | Yes |
| GET | `/api/chat/history/:id` | Get specific chat history | Yes |
| DELETE | `/api/chat/:id` | Delete a chat session | Yes |