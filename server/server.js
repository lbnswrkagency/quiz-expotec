const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Import the route files
const quizRoutes = require("./routes/quizRoutes");
const questionRoutes = require("./routes/questionRoutes");
const answerRoutes = require("./routes/answerRoutes");
const dataRoutes = require("./routes/dataRoutes");
const logoRoutes = require("./routes/logoRoutes");
const colorRoutes = require("./routes/colorRoutes");
const loginRoutes = require("./routes/loginRoutes");
const backgroundImageRoutes = require("./routes/backgroundImageRoutes");

dotenv.config();

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Use the routes
app.use("/api/quiz", quizRoutes);
app.use("/api/question", questionRoutes);
app.use("/api/answer", answerRoutes);
app.use("/api/data", dataRoutes);
app.use("/api/logo", logoRoutes);
app.use("/api/color", colorRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/background-image", backgroundImageRoutes);

app.get("/", (req, res) => {
  res.send("Quiz backend is up and running");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
