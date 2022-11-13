import { useState, useEffect } from "react";
import axios from "axios";

// Custom hook that fetches data from the API using axios
// It is set to timeout after 10 seconds if no response is received
function useFetch(url) {
  const [response, setResponse] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true); // set the loading state to true by default

  const fetchData = async () => {
    try {
      // Fetch the data from the API using axios
      const res = await axios.get(url, {
        timeout: 10000,
      });
      setResponse(res.data); // Set the response to the data received from the API
    } catch (error) {
      setError(error.message); // Set the error to the error message received from the API
    } finally {
      setIsLoading(false); // Set the loading state to false once the data has been fetched or an error has been received
    }
  };

  // Run the fetch function only once when the component mounts
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to fetch new data from the API to be used as a handler for the button click
  const doFetch = (url) => {
    setResponse([]);
    setError("");
    setIsLoading(true);
    fetchData();
  };

  return { response, error, isLoading, doFetch };
}

export default useFetch;
