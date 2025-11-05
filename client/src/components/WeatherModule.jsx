import { useEffect, useState } from "react";
import axios from "axios";

const base = import.meta.env.VITE_API_BASE || "";

export default function WeatherModule() {
  const [city, setCity] = useState("Hyderabad");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    try {
      setIsLoading(true);
      setError("");
      const res = await axios.get(
        `${base}/api/weather?city=${encodeURIComponent(city)}`
      );
      setData(res.data);
    } catch (e) {
      setError("Failed to fetch weather.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="bg-white card p-5 md:p-6 shadow-sm border">
      <h2 className="text-xl font-semibold mb-4">Weather</h2>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 rounded w-full"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          id="city"
          name="city"
        />
        <button className="bg-black text-white px-4 py-2 rounded" onClick={fetchWeather}>
          Go
        </button>
      </div>

      {isLoading && <p>Loading...</p>}
      {!isLoading && error && <p className="text-red-600">{error}</p>}
      {!isLoading && !error && data && (
        <p className="text-lg font-medium">
          {data.city}: {Math.round(data.tempC)}°C
        </p>
      )}
    </section>
  );
}
