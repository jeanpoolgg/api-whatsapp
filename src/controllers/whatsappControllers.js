const fs = require("fs");
const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));

const VerifyToken = (req, res) => {
    
    try {
        const accessToken = process.env.TOKEN_WHATSAPP;
        const token = req.query["hub.verify_token"];
        const challenge = req.query["hub.challenge"]

        if(challenge != null && token != null && token != accessToken){
            res.send(challenge);
        }else{
            res.status(400).send();
        }

    }catch(error){
        res.status(400).send();
    }
}

const ReceivedMessage = (req, res) => {
    try {
        const entry = (req.body["entry"])[0];
        const changes = (entry["changes"])[0];
        const value = changes["value"];
        const messageObject = value["messages"];

        myConsole.log(messageObject);
        res.send("EVENT_RECEIVED");
    } catch(error){

        myConsole.log(error);
        res.send("EVENT_RECEIVED");
    }
}

module.exports = {
    VerifyToken,
    ReceivedMessage
}