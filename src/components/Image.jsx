import { useState } from "react";

function Image({
  src,
  alt = "image",
  className = "",
  width,
  height,
  style = {},
  loading = "lazy",
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
        style={{
          objectFit: "contain",
          cursor: "pointer",
          ...style,
        }}
        onClick={() => setIsOpen(true)}
      />

      {/* Modal / Popup */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 99999,
          }}
        >
          <img
            src={src}
            alt={alt}
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              objectFit: "contain",
            }}
          />
        </div>
      )}
    </>
  );
}

export default Image;
