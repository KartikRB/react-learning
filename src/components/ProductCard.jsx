import React from "react";
import { useNavigate } from "react-router-dom";
import Image from './Image';
import BASE_URL from "../config";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

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
    navigate(`/product/${product.id}`, { state: { product } });
  };  

  return (
    <div className="card h-100 shadow-sm border-0" onClick={handleClick} style={{ cursor: "pointer" }}>
      <Image src={product.primary_image ? `${BASE_URL}/storage/${product.primary_image?.path}` : '/images/default_product.png'} className="card-img-top" height={250} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="text-muted mb-1"><small>{product.category?.name}</small></p>
        <p className="card-text">{product.short_description}</p>
        <div className="mb-2">
          <span className="text-warning">{renderStars(4.5)}</span>
          <span className="text-muted ms-2">{4.5}</span>
        </div>
        <h6 className="mt-auto">${product.price}</h6>
        <p className={`mb-2 ${product.stock > 0 ? "text-success" : "text-danger"}`}>
          {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
        </p>
        <button className="btn btn-primary mt-auto" disabled={product.stock === 0}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
