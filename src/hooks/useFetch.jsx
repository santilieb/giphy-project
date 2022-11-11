import { useState, useEffect } from "react";
import axios from "axios";

// Custom hook that fetches data from the GIPHY API using axios set to timeout after 5 seconds
function useFetch(url) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await axios.get(url, {
        timeout: 5000,
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

  // Function to fetch new data from the API to be called from the component
  const doFetch = (url) => {
    setResponse([]);
    setError("");
    setIsLoading(true);
    fetchData();
  };

  return { response, error, isLoading, doFetch };
}

export default useFetch;

// const useFetch = (url) => {
//   const [response, setResponse] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchData = async () => {
//     try {
//       const res = await fetch(url);
//       const { data } = await res.json();
//       setError(null);
//       setResponse(data);
//     } catch (error) {
//       setResponse(null);
//       setError(error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchNewData = () => {
//     setResponse(null);
//     setIsLoading(true);
//     setError(null);
//     fetchData();
//   };

//   useEffect(() => {
//     fetchData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   console.log(response);
//   console.log(isLoading);
//   console.log(error);

//   return { response, isLoading, error, fetchNewData };
// };

// export default useFetch;
