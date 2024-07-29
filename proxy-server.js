//criei esse proxy pois estava com erro no cors ao tentar realizar um patch
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use(async (req, res) => {
    const { method, url, body } = req;
    const apiUrl = `https://66a53a055dc27a3c190afb3f.mockapi.io${url}`;
    
    try {
        const response = await axios({
            method,
            url: apiUrl,
            data: body,
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/plain, */*'
            }
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ message: 'Network Error', error: error.message });
        }
    }
});

app.listen(port, () => {
    console.log(`Proxy server is running at http://localhost:${port}`);
});
