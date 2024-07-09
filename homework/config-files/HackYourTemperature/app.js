
import express from 'express'
import fetch from 'node-fetch';
import API_KEY from './sources/keys.js';


const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from backend to frontend!');
});

app.post('/weather', async (req, res) => {
  const { cityName } = req.body;
  
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`);
    const data = await response.json();
    
    if (response.status === 404) {
      res.json({ weatherText: "City is not found!" });
    } else {
      const temperature = data.main.temp;
      res.json({ weatherText: `The temperature in ${cityName} is ${temperature}K` });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
export  default app