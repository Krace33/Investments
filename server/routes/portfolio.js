import express from "express";
import session from "express-session";
import passport from "passport";
import bodyParser from "body-parser";
import { User, PortFolio, Investment } from "../mongodb.js";
import cookieParser from "cookie-parser";
import { getNetWorth2 } from "../utilities/calculations.js";

const portfolio = express.Router();
portfolio.use(bodyParser.urlencoded({ extended: true }));
portfolio.use(session({
    secret: process.env.PASSPORTSECRET,
    resave: true,
    saveUninitialized: true,
}));

portfolio.use(cookieParser(process.env.PASSPORTSECRET));

portfolio.use(passport.initialize());
portfolio.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, doc) => {
        done(err, doc);
    })
});

portfolio.route('/')
    .get(async (req, res) => {
        if (req.isAuthenticated) {
            const portfolios = await PortFolio.find({ userID: req.user.username });
            const netWorth = await getNetWorth2(req.user.username, portfolios);
            res.send({ portfolios, "Net Worth": netWorth });
            console.log("Portfolios sent");
        }
        else console.log("Portfolio route is active");
    })
    .post(async (req, res) => {
        if (req.isAuthenticated) {
            const name = req.body.portfolio;
            const userID = req.user.username;
            const obj = new PortFolio({
                userID,
                name
            })
            obj.save();
            console.log("New Portfolio added");
        }
        else console.log("Unauthorized for this route.")
    })
    .patch(async (req, res) => {
        if (req.isAuthenticated) {
            const id = req.body.id;
            let originalName = await PortFolio.findById(id)
            originalName = originalName.name;
            const name = req.body.name;
            await PortFolio.findByIdAndUpdate(id, { name: name });
            await Investment.updateMany({ name: originalName }, { name: name });
        }
        else console.log("Unauthorized for this route");
    })
    .delete(async (req, res) => {
        if (req.isAuthenticated) {
            const name = req.body.name;
            const userID = req.user.username;
            await PortFolio.findOneAndDelete({ name: name, userID: userID })
            await Investment.deleteMany({ portfolioID: name, userID: userID })
        }
        else console.log("Unauthorized for this route");
    })

portfolio.route('/:portfolio')
    .get(async (req, res) => {
        if (req.isAuthenticated) {
            const userID = req.user.username;
            const portfolioID = req.params.portfolio;
            console.log(portfolioID)
            const investments = await Investment.find({ userID: userID, portfolioID: portfolioID });
            res.send(investments);
        }
        else console.log("Unauthorized for this path");
    })
    .post(async (req, res) => {
        if (req.isAuthenticated) {
            const userID = req.user.username;
            const portfolioID = req.params.portfolio;
            const name = req.body.name;
            const quantity = req.body.number;
            const obj = new Investment({
                userID,
                portfolioID,
                name,
                quantity
            });
            obj.save();
            console.log(`${name} added to ${portfolioID}`);
        }
        else console.log("Unauthorized for this path");
    })
    .patch(async (req, res) => {
        if (req.isAuthenticated) {
            const id = req.body.id;
            const number = req.body.number;
            await Investment.findByIdAndUpdate(id, { quantity: number })
            console.log("Updated quantity successfully");
        }
        else console.log("Unauthorized for this path");
    })
    .delete(async (req, res) => {
        if (req.isAuthenticated) {
            const id = req.body.id;
            await Investment.findByIdAndDelete(id);
            console.log("Deleted successfully");
        }
        else console.log("Unauthorized for this path");
    })

export default portfolio;