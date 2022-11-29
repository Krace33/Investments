import express from "express";
import session from "express-session";
import passport from "passport";
import bodyParser from "body-parser";
import { User, PortFolio, Investment } from "../mongodb.js";
import cookieParser from "cookie-parser";

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


const getNetWorth = async (user, portfolios) => {
    let ans = 0;
    for (const p of portfolios) {
        const investments = await Investment.find({ userID: user, portfolioID: p.name });
        for (const investment of investments) {
            ans += investment.quantity * 5;
        }
    }
    return ans;
}

const addValueToPortfolios=async(user, portfolios)=>{
    const obj=[];
    for(const portfolio of portfolios){
        const investments=await Investment.find({userID:user, portfolioID:portfolio.name});
        let value=0;
        for(const investment of investments){
            value+=investment.quantity*5;
        }
        obj.push({
            name: portfolio.name,
            value
        })
    }
    console.log(obj);
    return obj;
}

portfolio.route('/')
    .get(async (req, res) => {
        if (req.isAuthenticated) {
            const user = req.user.username;
            let portfolios = await PortFolio.find({ userID: req.user.username });
            const netWorth = await getNetWorth(req.user.username, portfolios);
            const obj=await addValueToPortfolios(user, portfolios);
            res.send({ portfolios, netWorth, user, obj });
        }
        else res.status(401);
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
            res.send("Portfolio added");
        }
        else console.log("Unauthorized for this route.")
    })
    .patch(async (req, res) => {
        console.log(`Received editing request with info ${req.body.id}, ${req.body.name}`);
        if (req.isAuthenticated) {
            const id = req.body.id;
            let originalName = await PortFolio.findById(id)
            originalName = originalName.name;
            console.log(originalName);
            const name = req.body.name;
            await PortFolio.findByIdAndUpdate(id, { name: name });
            await Investment.updateMany({ userID: req.user.username, portfolioID: originalName }, { portfolioID: name });
            res.send("Update successful")
        }
        else console.log("Unauthorized for this route");
    })

portfolio.route('/delete').post(async (req, res) => {
    if (req.isAuthenticated) {
        const name = req.body.name;
        const userID = req.user.username;
        await PortFolio.findOneAndDelete({ name: name, userID: userID })
        await Investment.deleteMany({ portfolioID: name, userID: userID })
        res.send("Delete successful");
    }
    else console.log("Unauthorized for this route");
})

portfolio.route('/:portfolio')
    .get(async (req, res) => {
        if (req.isAuthenticated) {
            const userID = req.user.username;
            const portfolioID = req.params.portfolio;
            console.log(req.params);
            const investments = await Investment.find({ userID: userID, portfolioID: portfolioID });
            res.send({ investments, userID });
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
            res.send("Added successfully.")
        }
        else console.log("Unauthorized for this path");
    })
    .patch(async (req, res) => {
        if (req.isAuthenticated) {
            const id = req.body.id;
            const number = req.body.number;
            await Investment.findByIdAndUpdate(id, { quantity: number })
            console.log("Updated quantity successfully");
            res.send("Update Successfull");
        }
        else console.log("Unauthorized for this path");
    })

portfolio.route('/:portfolio/delete').post(async (req, res) => {
    if (req.isAuthenticated) {
        const id = req.body.id;
        await Investment.findByIdAndDelete(id);
        console.log("Deleted successfully");
        res.send("Delete successfull");
    }
    else console.log("Unauthorized for this path");
})

export default portfolio;