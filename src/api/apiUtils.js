// General function to make an API call
export const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
//!Note: missing the promise race function

// Object to store the different versions of the GIFs and the title
export const storeGifs = (data) => {
  return {
    title: data.title,
    // Sometimes the fixed_height is not available, so the original is placed instead
    small: data.images?.fixed_height.url || data?.images?.original.url,
    large: data.images?.original.url,
  };
};
