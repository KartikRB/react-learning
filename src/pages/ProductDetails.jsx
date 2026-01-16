import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Image from "../components/Image";
import BASE_URL from "../config";
import api from "../api/Axios";
import ProductCard from '../components/ProductCard';

const ProductDetails = () => {
  const location = useLocation();
  const product = location.state?.product;
  const [products, setProducts] = useState([]);

  if (!product) {
    return <p className="text-center mt-5 fs-4">Product not found!</p>;
  }

  const fetchProducts = async () => {
    try {
      const response = await api.get("/get-products");
      if (response.data.status) {
        const relatedProducts = response.data.data.filter(
          pro => pro.category_id === product.category_id && pro.id !== product.id
        ).slice(0, 4);
        setProducts(relatedProducts);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const sortedImages = [...product.images].sort((a, b) => b.is_primary - a.is_primary);
  const [mainImage, setMainImage] = useState(
    sortedImages.length ? `${BASE_URL}/storage/${sortedImages[0].path}` : "/images/default_product.png"
  );

  return (
    <div className="container" style={{ marginTop: "5rem" }}>
      <div className="row g-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h2 className="mb-0">Product Details</h2>
          <button className="btn btn-dark" onClick={() => window.history.back()}>
            Back
          </button>
        </div>
        <hr />
        <div className="col-md-1 d-flex flex-column align-items-center" style={{maxHeight: "450px", overflowY: "auto"}}>
          {sortedImages.map((img, idx) => (
            <div
              key={idx}
              className="mb-2 border rounded"
              style={{
                cursor: "pointer",
                border: mainImage === `${BASE_URL}/storage/${img.path}` ? "2px solid #007bff" : "1px solid #ccc",
                width: "60px",
                height: "60px",
                overflow: "hidden",
                flexShrink: 0,
              }}
              onClick={() => setMainImage(`${BASE_URL}/storage/${img.path}`)}
            >
              <img
                src={`${BASE_URL}/storage/${img.path}`}
                alt={product.name}
                className="img-fluid"
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </div>
          ))}
        </div>

        <div className="col-md-6 text-center">
          <div className="card shadow-sm border-0">
            <Image
              src={mainImage}
              alt={product.name}
              className="card-img-top img-fluid rounded"
              style={{
                maxHeight: "450px",
                width: "100%",
                objectFit: "contain",
                transition: "transform 0.3s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </div>
        </div>

        <div className="col-md-5">
          <h2 className="fw-bold">{product.name}</h2>

          <div className="mb-3">
            <span className="badge bg-secondary me-2">{product.category?.name}</span>
            {product.stock > 0 
              ? <span className="badge bg-success">{product.stock} in stock</span>
              : <span className="badge bg-danger">Out of stock</span>
            }
          </div>

          <h3 className="text-danger fw-bold mb-3">${product.price}</h3>

          <div className="d-flex align-items-center mb-3">
            {renderStars(4.5)}
            <span className="ms-2 text-muted">4.5 / 5</span>
          </div>

          <p className="lead">{product.short_description}</p>

          <div className="row g-2">
            <div className="col-md-6">
              <button className={`btn btn-dark btn-lg mt-3 w-100 ${product.stock === 0 ? 'disabled' : ''}`}>
              {product.stock === 0 ? "Out of Stock" : (
                <>
                  <i className="fa fa-shopping-cart me-2"></i>
                  Add to Cart
                </>
              )}
            </button>
            </div>
            <div className="col-md-6">
              <button className={`btn btn-warning btn-lg mt-3 w-100 ${product.stock === 0 ? 'disabled' : ''}`}>
              {product.stock === 0 ? "Out of Stock" : (
                <>
                  <i className="fa fa-heart me-2"></i>
                  Add to Wishlist
                </>
              )}
            </button>
            </div>
          </div>
        </div>
      </div>

      <div className="product-description my-5">
        <h5 className="mb-3">Product Details</h5>
        <p style={{ whiteSpace: "pre-line", lineHeight: "1.6" }}>{product.description}</p>
      </div>
      {products.length > 0 && (
        <div className="mt-4">
          <h5 className="mb-5">From the Same Category</h5>
          <div className="row">
            {products.filter(product => product.is_active && product.is_featured).map(product => (
              <div key={product.id} className="col-md-4 col-lg-3 col-6 mb-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      )} 
    </div>
  );
};

export default ProductDetails;
