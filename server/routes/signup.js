import express from 'express';
import passport from 'passport';
import { User } from '../mongodb.js';
import "dotenv/config"
import bodyParser from 'body-parser';
import session from 'express-session';

const signup = express.Router();

signup.use(bodyParser.urlencoded({ extended: true }));
signup.use(session({
    secret: process.env.PASSPORTSECRET,
    resave: true,
    saveUninitialized: true,
}));
signup.use(passport.initialize());
signup.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser((user, done)=> {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, (err, doc)=>{
        done(err, doc);
    })
});

signup.route('/')
    .get((req, res) => {
        res.send("Signup route is runnning");
    })
    .post((req, res) => {
        const {username, password}=req.body;
        User.register({ username }, password, (err, user) => {
            if (err) {
                console.log("There seems to be a problem here");
                res.redirect('/');
            }
            else {
                passport.authenticate("local")(req, res, async() => {
                    console.log("Registration successful");
                    res.send(req.user);
                })
            }
        })
    })

export default signup;
