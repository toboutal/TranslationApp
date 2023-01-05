const PORT = 8001
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/speech', async (req, res) => {
    console.log(req.query);
    const { textToSpeech, language } = req.query

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'f7c431b1dcmshecbb19d67aed064p11e427jsn9ad14d9e7e7d',
            'X-RapidAPI-Host': 'text-to-speech53.p.rapidapi.com'
        },
        body: '{"text":"'+ textToSpeech +'","lang":"'+ language + '","format":"wav"}'
    };
    try {
        let response = await fetch('https://text-to-speech53.p.rapidapi.com', options);
        res.status(200).json(await response.text());
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err });
    }

});

app.listen(PORT, () => console.log('Server running on port ' + PORT));