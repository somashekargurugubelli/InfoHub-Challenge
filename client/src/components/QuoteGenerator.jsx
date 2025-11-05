import { useState, useEffect } from "react"
import axios from "axios"

export default function QuoteGenerator() {
  const [quote, setQuote] = useState("")

  const loadQuote = async () => {
    const res = await axios.get("/api/quote")
    setQuote(res.data.quote)
  }

  useEffect(() => { loadQuote() }, [])

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Motivation</h2>
      <p className="italic text-lg mb-4">"{quote}"</p>
      <button className="bg-black text-white px-4 py-2 rounded" onClick={loadQuote}>
        New Quote
      </button>
    </div>
  )
}
