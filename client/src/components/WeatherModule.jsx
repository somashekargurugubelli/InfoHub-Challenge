import { useState, useEffect } from "react"
import axios from "axios"

export default function WeatherModule() {
  const [city, setCity] = useState("Hyderabad")
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchWeather = async () => {
    setLoading(true)
    const res = await axios.get(`/api/weather?city=${city}`)
    setData(res.data)
    setLoading(false)
  }

  useEffect(() => { fetchWeather() }, [])

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Weather</h2>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 rounded w-full"
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <button className="bg-black text-white px-4 py-2 rounded" onClick={fetchWeather}>
          Go
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {data && (
        <p className="text-lg font-medium">
          {data.city}: {data.tempC}°C
        </p>
      )}
    </div>
  )
}
