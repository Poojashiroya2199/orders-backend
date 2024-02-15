// server.js
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
// app.use(
//   cors({
//     origin: "https://orders-frontend.netlify.app", // Replace with your frontend URL
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true,
//     optionsSuccessStatus: 200,
//     preflightContinue: false
//   })
// );
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://poojashiroya99:Uh1tBgSJ79kjiySV@cluster0.7b9xhub.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("connected"))
  .catch((error) => console.log(error));

const authRoutes = require("./routes/authroutes");
app.use("/api/auth", authRoutes);

const buyOrderRoutes = require("./routes/buyOrderRoutes");
app.use("/api/buyOrder", buyOrderRoutes);

const sellOrderRoutes = require("./routes/sellOrderRoutes");
app.use("/api/sellOrder", sellOrderRoutes);

function authenticateToken(token) {
  let authorize = true;
  jwt.verify(token, "login", (err, user) => {
    if (err) {
      authorize = false;
    }
  });
  return authorize;
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
