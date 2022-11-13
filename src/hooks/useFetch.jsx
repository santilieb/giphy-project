import { useState, useEffect } from "react";
import axios from "axios";

// Custom hook that fetches data from the API using axios, set to timeout after 10 seconds
function useFetch(url) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await axios.get(url, {
        timeout: 10000,
      });
      const { data } = res.data;
      setResponse(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch new data from the API to be used as a handler
  const doFetch = (url) => {
    setResponse([]);
    setError("");
    setIsLoading(true);
    fetchData();
  };

  return { response, error, isLoading, doFetch };
}

export default useFetch;
