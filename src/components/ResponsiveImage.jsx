function ResponsiveImage({ smallSrcSet, largeSrcSet, alt, className = "" }) {
  return (
    <picture>
      <source
        media="(max-width: 900px)"
        srcSet={`${smallSrcSet} 900w`}
        sizes="900px"
        alt={alt}
      />
      <source srcSet={largeSrcSet} alt={alt} />
      {/* The img with src attribute is required for older browsers */}
      <img
        src={largeSrcSet}
        alt={alt}
        className={`${className} images-container__image`}
      />
    </picture>
  );
}

export default ResponsiveImage;
