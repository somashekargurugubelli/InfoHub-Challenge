import express from 'express'
import cors from 'cors'
import axios from 'axios'

const app = express()
app.use(cors({ origin: '*' }))
app.use(express.json())

// Weather (Open‑Meteo)
app.get('/api/weather', async (req, res) => {
  try {
    const city = req.query.city || "Hyderabad";
    const geo = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`
    );
    if (!geo.data.results || geo.data.results.length === 0)
      return res.status(404).json({ error: "City not found" });

    const { latitude, longitude, name } = geo.data.results[0];
    const weather = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const data = weather.data.current_weather;

    res.json({
      city: name,
      tempC: data.temperature,
      wind: data.windspeed,
      description: "Live Weather",
      icon: "01d"
    })
  } catch {
    res.status(500).json({ error:"Weather fetch failed" })
  }
})

// Currency API (no key)
// Currency API (Frankfurter - NO KEY)
app.get('/api/currency', async (req, res) => {
  try {
    const amount = parseFloat(req.query.amount || "1");

    const api = await axios.get(
      "https://api.frankfurter.app/latest?from=INR&to=USD,EUR"
    );

    const usd = amount * api.data.rates.USD;
    const eur = amount * api.data.rates.EUR;

    res.json({ amountINR: amount, usd, eur });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Currency fetch failed" });
  }
});


// Live quotes
app.get('/api/quote', async (req, res) => {
  try {
    const q = await axios.get("https://zenquotes.io/api/random");
    res.json({ quote: q.data[0].q, author: q.data[0].a })
  } catch {
    res.status(500).json({ error:"Quote fetch failed" })
  }
})

app.listen(3001, () => console.log("Server running on 3001"))
