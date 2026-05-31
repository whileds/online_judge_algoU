Online Judge

A MERN Stack based Online Judge platform inspired by LeetCode that allows users to solve coding problems, run code against custom test cases, and submit solutions for evaluation.


COMPLETED FEATURE

1. Authentication
     User Registration
     User Login
     JWT Authentication
     Secure Password Hashing using bcrypt
     Protected Routes using Middleware


TECH STACK


1.Frontend
     React.js
     Tailwind CSS
2.Backend
     Node.js
     Express.js
3..Database
     MongoDB
4.Authentication
     JWT
     Cookies
     bcryptjs


PROJECT STRUCTURE

backend/
├── controllers/
├── middleware/
├── models/
├── routes/
├── config/
└── index.js  




INSTALLATION

Clone the repository
git clone <repository-url>
Install dependencies

cd backend
npm install

Create a .env file

PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Start the server

npm run dev
