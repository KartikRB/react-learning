function Image({
    src,
    alt = "image",
    className = "",
    width,
    height,
    style = {},
    loading = "lazy",
    onClick,
  }) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
        onClick={onClick}
        style={{
          objectFit: "contain",
          ...style,
        }}
      />
    )
  }
  
  export default Image
  