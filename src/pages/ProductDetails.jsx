import React from "react";
import { useParams, useLocation } from "react-router-dom";
import Image from "../components/Image";

const ProductDetails = () => {
  const { id } = useParams(); 
  const location = useLocation();
  const product = location.state?.product;

  if (!product) {
    return <p className="text-center mt-5">Product not found!</p>;
  }

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        <span className="text-warning">{"★".repeat(fullStars)}</span>
        {halfStar && <span className="text-warning">☆</span>}
        <span className="text-muted">{"☆".repeat(emptyStars)}</span>
      </>
    );
  };

  return (
    <div className="container" style={{marginTop:"7rem"}}>
      <div className="row">
        {/* Product Image */}
        <div className="col-md-5 text-center mb-4">
          <Image 
            src={product.image} 
            alt={product.name} 
            className="img-fluid rounded shadow-sm" 
            style={{ height: "400px", objectFit: "contain" }}
          />
        </div>

        {/* Product Details */}
        <div className="col-md-7">
          <h2 className="mb-3">{product.name}</h2>
          <p>
            <span className="badge bg-secondary me-2">{product.category}</span>
            {product.stock > 0 
              ? <span className="badge bg-success">{product.stock} in stock</span>
              : <span className="badge bg-danger">Out of stock</span>
            }
          </p>

          <h4 className="text-danger mb-3">${product.price.toFixed(2)}</h4>

          <div className="mb-3">
            {renderStars(product.rating)}
            <span className="ms-2 text-muted">{product.rating.toFixed(1)}</span>
          </div>

          <p>{product.description}</p>

          <button 
            className="btn btn-dark mt-3"
            disabled={product.stock === 0}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
