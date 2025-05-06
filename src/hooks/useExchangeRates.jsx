import { useState, useEffect } from "react";
import axios from "axios";

function useExchangeRates(base = "USD") {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/33fb688733cd3a7119c9e906/latest/USD`
        );
        setRates(response.data.rates);
      } catch (err) {
        setError("Failed to fetch exchange rates.");
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [base]);

  return { rates, loading, error };
}

export default useExchangeRates;
