import express from 'express';

const home = express.Router();


home.get('/', async (req, res) => {
    res.send("Server is running");
})

export default home;
