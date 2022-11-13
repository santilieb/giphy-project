// Object to store the different versions of the GIFs and the title
export const storeGifs = (data) => {
  return {
    title: data.title,
    still: data.images?.fixed_height_small_still.url,
    // Sometimes the fixed_height GIF is not available, so the original is placed instead
    small: data.images?.fixed_height.url || data?.images?.original.url,
    large: data.images?.original.url,
  };
};
