const express= require("express");
const {randomBytes} = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app=express();
app.use(express.json()); 
app.use(cors());

app.post('/events', (req,res) => {
    const event = req.body;

    axios.post("http://localhost:8000/events",event);
    axios.post("http://localhost:3001/events",event);
    axios.post("http://localhost:3002/events",event);

    res.send({
        status: "OK",
    });
});

app.listen(4005, () => {
    console.log("Listening on 4005!");
})