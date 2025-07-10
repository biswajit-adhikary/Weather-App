require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

app.use(express.static('.'));

app.get('/weather', async (req, res) => {
    const city = req.query.q;
    const lat = req.query.lat;
    const lon = req.query.lon;
    const apiKey = process.env.API_KEY;
    let url;

    if (city) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    } else if (lat && lon) {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    } else {
        return res.status(400).json({ message: 'Invalid request' });
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ message: 'Error fetching weather data' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});