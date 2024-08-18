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
    res.send("Hola Received");
}

module.exports = {
    VerifyToken,
    ReceivedMessage
}