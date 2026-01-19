import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Image from './Image';
import BASE_URL from "../config";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {"★".repeat(fullStars)}
        {halfStar && "☆"}
        {"☆".repeat(emptyStars)}
      </>
    );
  };

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="card h-100 shadow-sm border-0">
      <Image src={product.primary_image ? `${BASE_URL}/storage/${product.primary_image?.path}` : '/images/default_product.png'} className="card-img-top" height={250} />
      <div className="card-body d-flex flex-column">
        <div className="mb-3" onClick={handleClick} style={{ cursor: "pointer" }}>
          <h5 className="card-title">{product.name}</h5>
          <div className="mb-2">
            <span className="text-warning">{renderStars(4.5)}</span>
            <span className="text-muted ms-2">{4.5}</span>
          </div>
          <p className="text-danger mb-1"><small>{product.category?.name}</small></p>
          <p className="card-text">{product.short_description}</p>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <h4 className="mt-auto">${product.price}</h4>
          <p className={`mb-2 ${product.stock > 0 ? "text-success" : "text-danger"}`}>
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </p>
        </div>
        <button className="btn btn-dark mt-2" disabled={product.stock === 0}>
          <i className="fa fa-shopping-cart me-2"></i> Add to Cart
        </button>
        <button className="btn btn-primary mt-2" disabled={product.stock === 0}>
          <i className="fa fa-heart me-2"></i> Add to Wishlist
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
