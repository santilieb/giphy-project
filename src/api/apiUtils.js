// It is an object to store the title and URLs of the GIFs
export const storeGifs = (data) => {
  return {
    title: data.title,
    still: data.images?.fixed_height_small_still.url,
    // Sometimes the fixed_height GIF is not available, so the original is placed in its stead
    small: data.images?.fixed_height.url || data?.images?.original.url,
    large: data.images?.original.url,
  };
};
