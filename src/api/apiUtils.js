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
    title: data?.title,
    still: data?.images.downsized_still.url,
    small: data?.images.fixed_width_small.url,
    medium: data?.images.fixed_height.url,
    large: data?.images.original.url,
  };
};
