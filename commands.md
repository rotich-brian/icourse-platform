mongoD=> mongod --dbpath /home/briank/Desktop/Projects/iCourse Web/backend/DB
=> mongosh

react=> cd frontend, npm run dev

GoBackend=> cd backend, go run .

db.courses.insertOne(
{ title: "Introduction to MongoDB",description: "Learn the basics of MongoDB",instructor: "John Doe",duration: 5 }
)

db.courses.insertMany([
{ title: "Advanced MongoDB", description: "Deep dive into MongoDB", instructor: "Jane Doe", duration: 10 },
{ title: "MongoDB for Developers", description: "Practical MongoDB skills", instructor: "Alice Smith", duration: 7 }
])
