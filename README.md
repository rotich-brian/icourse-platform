# E-Learning Platform (iCourse)

A scalable full-stack e-learning platform built with **ReactJS**, **Go**, and **MongoDB**.  
This project features authentication, course management, RESTful APIs, and a clean user interface to deliver a seamless online learning experience.

![Project Image](/icourse.png)

---

## Table of Contents

- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [Database Initialization](#database-initialization)
- [Project Structure](#project-structure)
- [License](#license)
- [Contact](#contact)

---

## Demo

- Live Demo: [iCourse Platform](https://github.com/rotich-brian/icourse-platform)
- Source Code: [GitHub Repository](https://github.com/rotich-brian/icourse-platform)

---

## Tech Stack

- **Frontend**: ReactJS
- **Backend**: Go (REST Framework)
- **Database**: MongoDB
- **Containerization**: Docker (optional)

---

## Features

- 🧑‍🎓 User Authentication (Login / Signup)
- 📚 Course Creation and Management
- 🔄 RESTful API Integration between Frontend and Backend
- 🗃️ MongoDB NoSQL Database for dynamic data storage
- 🚀 Scalable and Responsive Frontend built with React
- 🔒 Secure handling of user data and sessions
- ⚡ Real-time feedback and smooth user experience

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/rotich-brian/icourse-platform.git
cd icourse-platform
```

### 2. Run the MongoDB Database

Make sure MongoDB is installed.

Start MongoDB server with a custom database path:

```bash
mongod --dbpath /home/sudo-k/Desktop/Projects/iCourse\ Web/backend/DB
```

Then open Mongo Shell:

```bash
mongosh
```

### 3. Run the Backend Server (Go)

```bash
cd backend
go run .
```

### 4. Run the Frontend Server (React)

```bash
cd frontend
npm install
npm run dev
```

---

## Database Initialization

Insert initial course data into MongoDB:

```javascript
db.courses.insertOne({
  title: "Introduction to MongoDB",
  description: "Learn the basics of MongoDB",
  instructor: "John Doe",
  duration: 5,
});
```

Or insert multiple courses at once:

```javascript
db.courses.insertMany([
  {
    title: "Advanced MongoDB",
    description: "Deep dive into MongoDB",
    instructor: "Jane Doe",
    duration: 10,
  },
  {
    title: "MongoDB for Developers",
    description: "Practical MongoDB skills",
    instructor: "Alice Smith",
    duration: 7,
  },
]);
```

---

## Project Structure

```
icourse-platform/
│
├── backend/       # Go server files (controllers, routes, database connection)
├── frontend/      # ReactJS front-end app
├── DB/            # MongoDB local database files
└── README.md
```

---

## License

This project is licensed under the MIT License.  
See the [LICENSE](LICENSE) file for more details.

---

## Contact

For questions, collaboration, or feedback:  
**Brian Rotich** – [GitHub](https://github.com/rotich-brian)

---

> Designed and built with ❤️ from Nairobi, Kenya (Feb – Nov 2024)
