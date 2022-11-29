import express from 'express';
import sessios from 'express-session';

const logout=express.Router();

logout.route('/').
get((req, res)=>{
    req.logout;
    console.log("User logged out successfully");
    res.send(`Logged out successfully`);
})

export default logout;