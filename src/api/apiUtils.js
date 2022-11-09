// General function to make an API call
export const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

//!Note: missing the promise race function
