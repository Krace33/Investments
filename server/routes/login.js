import express from "express";
import session from "express-session";
import passport from "passport";
import bodyParser from "body-parser";
import { User } from "../mongodb.js";
import cookieParser from "cookie-parser";

const login = express.Router();
login.use(bodyParser.urlencoded({ extended: true }));
login.use(session({
    secret: process.env.PASSPORTSECRET,
    resave: true,
    saveUninitialized: true,
}));

login.use(cookieParser(process.env.PASSPORTSECRET));

login.use(passport.initialize());
login.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, doc) => {
        done(err, doc);
    })
});



login.route('/')
    .get(async (req, res) => {
        if(req.isAuthenticated()){
            console.log("Login Route is working");
            res.send("Login Route is running");
    }})
    .post((req, res, next) => {
        passport.authenticate("local", { failureRedirect: '/login' }, async (err, user) => {
            if (err) res.status(401).json({ 'error': 'unauthorized' });
            else {
                req.logIn(user, (err) => {
                    if (err) res.status(401).json({ 'error': 'unauthorized' });
                    else{
                        console.log("User is successfully logged in")
                        res.send(req.user);
                    } 
                })
            }
        })(req, res, next);
    });

export default login;