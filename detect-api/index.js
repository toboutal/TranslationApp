const PORT = 8002
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/detect', async (req, res) => {
    console.log(req.query);
    const { text } = req.query
    const encodedParams = new URLSearchParams();
    encodedParams.append("q", text);

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/gzip',
            'X-RapidAPI-Key': 'f7c431b1dcmshecbb19d67aed064p11e427jsn9ad14d9e7e7d',
            'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
        },
        body: encodedParams
    };
    try {
        let response = await fetch('https://google-translate1.p.rapidapi.com/language/translate/v2/detect', options);
        res.status(200).json(await response.text());
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err });
    }

});

app.listen(PORT, () => console.log('Server running on port ' + PORT));