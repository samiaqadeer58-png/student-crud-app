// server.js

const jwt = require('jsonwebtoken');
const express = require("express");
const cors = require("cors");          // ✅ CORS import
const app = express();
const connectDB = require("./Database/connection");
connectDB();                            // ✅ MongoDB connect
const bodyParser = require('body-parser');

// ✅ Middlewares
app.use(cors());                        // ✅ CORS allow all origins
app.use(bodyParser.urlencoded({ extended: true }));  // parse URL encoded
app.use(bodyParser.json());             // parse JSON

// ✅ Secret key for JWT (agar future me token use karni hai)
app.set("secretKey", "i am a fullstack webdeveloper rehmanDeveloper112233445566");

// ✅ Routes
const studRoutes = require("./Routes/studroutes");
app.use("/Student", studRoutes);        // → Frontend me axios URL: http://localhost:4100/Student/...

const userRoutes = require("./Routes/userroutes");
app.use("/user", userRoutes);

// ✅ Test route
app.get("/welcome", (req, res) => {
  res.send("Welcome to first Api with express and mongoose");
});

// ✅ Optional: JWT validation (agar token use nahi kar rahi to comment kar sakti ho)
function validateUser(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).send("Token not found");
    }

    const secretKey = req.app.get('secretKey');

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).send("Authorization Failed");
        }
        next();
    });
}

// ✅ Start server
app.listen(4100, () => {
  console.log("Your server is running on port # 4100");
});