import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema=new mongoose.Schema({
    username: String,
    password: String,
});

const portfolioSchema=new mongoose.Schema({
    userID: String,
    name: String,
});

const investmentSchema=new mongoose.Schema({
    userID: String,
    portfolioID: String,
    name: String,
    quantity: Number
});

userSchema.plugin(passportLocalMongoose);

const User=mongoose.model("Users", userSchema);
const PortFolio=mongoose.model("Portfolios", portfolioSchema);
const Investment=mongoose.model("Investments", investmentSchema);

export {User, PortFolio, Investment};