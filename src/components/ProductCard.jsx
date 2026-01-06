import React from "react";
import { useNavigate } from "react-router-dom";
import Image from './Image';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { id, name, price, image, description, rating, category, stock } = product;

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
    navigate(`/product/${id}`, { state: { product } });
  };  

  return (
    <div className="card h-100 shadow-sm border-0" onClick={handleClick} style={{ cursor: "pointer" }}>
      <Image src={image} className="card-img-top" height={250} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{name}</h5>
        <p className="text-muted mb-1"><small>{category}</small></p>
        <p className="card-text">{description}</p>
        <div className="mb-2">
          <span className="text-warning">{renderStars(rating)}</span>
          <span className="text-muted ms-2">{rating.toFixed(1)}</span>
        </div>
        <h6 className="mt-auto">${price.toFixed(2)}</h6>
        <p className={`mb-2 ${stock > 0 ? "text-success" : "text-danger"}`}>
          {stock > 0 ? `${stock} in stock` : "Out of stock"}
        </p>
        <button className="btn btn-primary mt-auto" disabled={stock === 0}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
