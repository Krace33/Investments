import express from 'express';

const home=express.Router();


home.get('/', (req,res)=>{
    console.log("Request recieved");
    res.send("Server is running");
})

export default home;
