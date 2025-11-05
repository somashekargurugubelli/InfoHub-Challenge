import { useState } from "react"
import WeatherModule from "./components/WeatherModule.jsx"
import CurrencyConverter from "./components/CurrencyConverter.jsx"
import QuoteGenerator from "./components/QuoteGenerator.jsx"

export default function App() {
  const [tab, setTab] = useState("Weather")

  const tabs = [
    { name: "Weather", component: <WeatherModule /> },
    { name: "Currency", component: <CurrencyConverter /> },
    { name: "Quotes", component: <QuoteGenerator /> },
  ]

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-2">InfoHub</h1>
      <p className="text-gray-600 mb-6">Live Weather • Currency • Motivation</p>

      <div className="flex space-x-4 mb-6">
        {tabs.map(t => (
          <button
            key={t.name}
            onClick={() => setTab(t.name)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              tab === t.name
                ? "bg-black text-white"
                : "bg-white text-black border hover:bg-gray-200"
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow-md">
        {tabs.find(t => t.name === tab)?.component}
      </div>
    </div>
  )
}
