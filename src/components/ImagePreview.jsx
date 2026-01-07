import React from "react";
import Image from "./Image";

const ImagePreview = ({ className, imageSrc, onRemove = null, width = "200px", height = "200px" }) => {
  if (!imageSrc) return null; // don't render if no image

  return (
    <div
        className={className}
      style={{
        position: "relative",
        width: width,
        height: height,
        border: "1px solid #ccc",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <Image
        src={imageSrc}
        alt="preview"
        width={width}
        height={height}
        style={{objectFit: "cover"}}
      />
      {onRemove ? (
        <button
          onClick={onRemove}
          style={{
            position: "absolute",
            top: "5px",
            right: "5px",
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "25px",
            height: "25px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          <i className="fa fa-times"></i>
        </button>
      ) : ''}
      
    </div>
  );
};

export default ImagePreview;