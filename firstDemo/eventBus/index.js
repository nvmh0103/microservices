const express= require("express");
const {randomBytes} = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app=express();
app.use(express.json()); 
app.use(cors());

app.post('/events', async (req,res) => {
    const event = req.body;

    await axios.post("http://localhost:8000/events",event); // post
    await axios.post("http://localhost:3001/events",event); // comment
    await axios.post("http://localhost:3002/events",event); // query
    await axios.post("http://localhost:4003/events",event); // moderation


    res.send({
        status: "OK",
    });
});

app.listen(4005, () => {
    console.log("Listening on 4005!");
})