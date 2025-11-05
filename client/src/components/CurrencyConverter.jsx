import { useState, useEffect } from "react";
import axios from "axios";

const base = import.meta.env.VITE_API_BASE || "";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(100);
  const [data, setData] = useState(null);

  const convert = async () => {
    const res = await axios.get(`${base}/api/currency?amount=${amount}`);
    setData(res.data);
  };

  useEffect(() => {
    convert();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Currency Converter</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="number"
          className="border p-2 rounded w-full"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <button className="bg-black text-white px-4 py-2 rounded" onClick={convert}>
          Convert
        </button>
      </div>

      {data && (
        <p className="text-lg font-medium">
          ₹{data.amountINR} = ${data.usd.toFixed(2)} | €{data.eur.toFixed(2)}
        </p>
      )}
    </div>
  );
}
