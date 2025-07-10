require('dotenv').config();
const fetch = require('node-fetch');

module.exports = async (req, res) => {
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
        return res.status(400).json({ message: 'Invalid request: City or coordinates are required.' });
    }

    try {
        const apiResponse = await fetch(url);
        const data = await apiResponse.json();

        if (!apiResponse.ok) {
            return res.status(apiResponse.status).json({ message: data.message || 'An error occurred.' });
        }

        res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate');
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
