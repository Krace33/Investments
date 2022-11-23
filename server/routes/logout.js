import express from 'express';

const logout=express.Router();

logout.route('/').
get((req, res)=>{
    req.logout;
    console.log("User logged out successfully");
})

export default logout;