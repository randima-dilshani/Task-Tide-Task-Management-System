# 🚀 Task Tide – Smart Task Management System

Welcome to **Task Tide**, a beautiful and efficient full-stack task management app designed to help individuals and teams **stay organized, productive, and on track**. With intuitive design, real-time feedback, and smooth animations, Task Tide offers a seamless experience from sign-up to task completion.

---
> 🌐 **Live Demo:** : https://task-tide-tasks-management-system.vercel.app/

## 🖼️ Overview

✨ Task Tide is built using the **MERN stack** (MongoDB, Express, React, Node.js) with a modern UI powered by **Ant Design** and **Framer Motion**. It enables users to:

- Create and manage tasks effortlessly 📝  
- Track progress with visual task stages 📊  
- View summary stats on a dashboard 📋  
- Add and view team members 👥  
- Get real-time feedback and alerts ✅  
- Perform smooth edits via modals 🎯  
- Experience well-tested, stable flows with unit/integration tests 🧪

- ## 🛠️ Tech Stack

| Frontend | Backend | Database | Styling & UI | Testing |
|---------|---------|----------|--------------|---------|
| React + Vite | Node.js + Express | MongoDB | Ant Design, TailwindCSS | Vitest, React Testing Library |
| Axios | REST API | Mongoose | Framer Motion | Jest (where needed) |


---

## 🚀 Local Setup Instructions

## 1. 📦 Clone the Repository

git clone https://github.com/randima-dilshani/Task-Tide-Task-Management-System.git

cd task-tide

## 2. 🔁 Backend Setup

cd task-api

npm install

## 📄 Create .env file inside task-api/ directory:

PORT=8080
MONGO_URI=your_mongodb_connection_url
JWT_SECRET=your_jwt_secret

▶️ Start the server:

npm run dev

## 3. 💻 Frontend Setup

cd client

npm install

✏️ Configure Axios (client/src/util/axios.js):

const axiosInstance = axios.create({
  baseURL: "https://task-tide-task-management-system-production.up.railway.app/", 
});

▶️ Start the frontend:

npm run dev

## ✅ Testing

npm run test
