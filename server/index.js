import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config"
import mongoose from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";
import signup from "./routes/signup.js";
import home from "./routes/home.js";
import login from "./routes/login.js";
import logout from "./routes/logout.js";

const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.PASSPORTSECRET,
    resave: true,
    saveUninitialized: true,
}));
// app.use(cors({
//     origin: 'http://127.0.0.1:3000',
//     credentials: true
// }))
app.use(cors())
app.use(cookieParser(process.env.PASSPORTSECRET));


app.listen(5000, () => {
    console.log("Server is running on port 5000");
})

app.use('/', home);
app.use('/login', login);
app.use('/signup', signup);
app.use('/logout', logout)

try {
    mongoose.connect("mongodb://localhost:27017/investmentsDB");
} catch (e) {
    res.send(e);
}