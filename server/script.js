const mongoose = require("mongoose");
const User = require("./models/loginModel");

// Replace these with your MongoDB connection details
const mongodbURL =
  "mongodb+srv://dbFyped:bat8fugi4@cluster0.9ire6.mongodb.net/Quiz?retryWrites=true&w=majority";

// Replace these with the username and password you want to add
const username = "LBNSWRK";
const password = "_C}QIRC4i8oXV9";

async function main() {
  // Connect to MongoDB
  await mongoose.connect(mongodbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Create a new user
  const user = new User({
    username: username,
    password: password,
  });

  // Save the user
  await user.save();

  // Disconnect from MongoDB
  await mongoose.disconnect();

  console.log(`User ${username} added successfully.`);
}

main().catch((err) => console.error(err));
