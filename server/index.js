import express from "express";
import cors from "cors";

const app=express();
app.use(cors())

app.listen(5000, ()=>{
    console.log("Server is running");
});

app.get('/', (req, res)=>{
    console.log("Request recieved");
    res.send("Server is up and running");
})