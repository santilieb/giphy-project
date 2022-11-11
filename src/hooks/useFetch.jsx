import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const res = await fetch(url);
      const { data } = await res.json();
      setError(null);
      setResponse(data);
    } catch (error) {
      setResponse(null);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNewData = () => {
    setResponse(null);
    setIsLoading(true);
    setError(null);
    fetchData();
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(response);
  console.log(isLoading);
  console.log(error);

  return { response, isLoading, error, fetchNewData };
};

export default useFetch;
