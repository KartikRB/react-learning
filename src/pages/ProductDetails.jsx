import React from "react";
import { useParams, useLocation } from "react-router-dom";
import Image from "../components/Image";
import BASE_URL from "../config";

const ProductDetails = () => {
  const { id } = useParams(); 
  const location = useLocation();
  const product = location.state?.product;

  if (!product) {
    return <p className="text-center mt-5 fs-4">Product not found!</p>;
  }

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        <span className="text-warning fs-5">{"★".repeat(fullStars)}</span>
        {halfStar && <span className="text-warning fs-5">☆</span>}
        <span className="text-muted fs-5">{"☆".repeat(emptyStars)}</span>
      </>
    );
  };

  return (
    <div className="container" style={{ marginTop: "5rem" }}>
      <div className="row g-4">
        {/* Product Image */}
        <div className="col-md-5 text-center">
          <div className="card shadow-sm border-0">
            <Image 
              src={product.primary_image ? `${BASE_URL}/storage/${product.primary_image?.path}` : '/images/default_product.png'}
              alt={product.name} 
              className="card-img-top img-fluid rounded"
              style={{ height: "450px", objectFit: "contain", transition: "transform 0.3s" }}
              onMouseOver={e => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="col-md-7">
          <div className="mb-3">
            <h2 className="fw-bold">{product.name}</h2>
            <div className="mb-2">
              <span className="badge bg-secondary me-2">{product.category?.name}</span>
              {product.stock > 0 
                ? <span className="badge bg-success">{product.stock} in stock</span>
                : <span className="badge bg-danger">Out of stock</span>
              }
            </div>
          </div>

          <h3 className="text-danger fw-bold mb-3">${product.price}</h3>

          <div className="d-flex align-items-center mb-3">
            {renderStars(4.5)}
            <span className="ms-2 text-muted">4.5 / 5</span>
          </div>

          <p className="lead">{product.short_description}</p>

          <button 
            className={`btn btn-dark btn-lg mt-3 ${product.stock === 0 ? 'disabled' : ''}`}
          >
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>

          <hr className="my-4" />

          <div className="product-description">
            <h5 className="mb-3">Product Details</h5>
            <p style={{ whiteSpace: "pre-line", lineHeight: "1.6" }}>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
