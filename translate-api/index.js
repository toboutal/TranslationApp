const PORT = 8000
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/translate', async (req, res) => {
    console.log(req.query);
    const { textToTranslate, outputLanguage, inputLanguage } = req.query
    const encodedParams = new URLSearchParams();
    encodedParams.append("q", textToTranslate);
    encodedParams.append("target", outputLanguage);
    encodedParams.append("source", inputLanguage);

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/gzip',
            'X-RapidAPI-Key': '33ab0d7443mshe9948eb52388808p13ef6ajsnfd9d705f87b2',
            'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
        },
        body: encodedParams
    };
    try {
        let response = await fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', options);
        res.status(200).json(await response.text());
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err });
    }

});

app.listen(PORT, () => console.log('Server running on port ' + PORT));