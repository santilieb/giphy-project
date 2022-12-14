// GIF Item component that loads the image corresponding to the screen size
// It takes in the following props:
// - smallSrcSet: the srcset for the small image
// - largeSrcSet: the srcset for the large image
// - alt: the title of the GIF from the API

function GifItem({ smallSrcSet, largeSrcSet, alt }) {
  return (
    <picture>
      <source
        media="(max-width: 900px)"
        srcSet={`${smallSrcSet} 900w`}
        sizes="900px"
      />
      <source srcSet={largeSrcSet} />
      {/* The img with src attribute is required for older browsers */}
      <img src={largeSrcSet} alt={alt} className="images-container__image" />
    </picture>
  );
}

export default GifItem;
