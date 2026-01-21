import React, { useRef } from "react";

export default function ImageMagnifier({ src, width, height, zoom }) {
  const imgRef = useRef(null);
  const lensRef = useRef(null);

  const handleMouseMove = (e) => {
    const img = imgRef.current;
    const lens = lensRef.current;

    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const lensWidth = lens.offsetWidth / 2;
    const lensHeight = lens.offsetHeight / 2;

    let lensX = x - lensWidth;
    let lensY = y - lensHeight;

    if (lensX < 0) lensX = 0;
    if (lensY < 0) lensY = 0;
    if (lensX > rect.width - lens.offsetWidth) lensX = rect.width - lens.offsetWidth;
    if (lensY > rect.height - lens.offsetHeight) lensY = rect.height - lens.offsetHeight;

    lens.style.left = lensX + "px";
    lens.style.top = lensY + "px";

    lens.style.backgroundPosition = `-${lensX * zoom}px -${lensY * zoom}px`;
  };

  return (
    <div
      className="image-magnifier-container"
      style={{ width: width, height: height }}
    >
      <img
        ref={imgRef}
        src={src}
        alt="product"
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
      <div
        ref={lensRef}
        className="lens"
        style={{
          backgroundImage: `url(${src})`,
          backgroundPosition: "contain",
          backgroundSize: `${width * zoom}px ${height * zoom}px`,
        }}
      ></div>
      <div
        className="overlay"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => (lensRef.current.style.display = "block")}
        onMouseLeave={() => (lensRef.current.style.display = "none")}
      ></div>
    </div>
  );
}
