import { useEffect, useState } from "react";
import Title from "../components/Title"
import ProductCard from '../components/ProductCard';
import api from "../api/Axios";

function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setcategories] = useState([]);
  const [maxPriceRange, setMaxPriceRange] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  const fetchProducts = async () => {
    try {
      const response = await api.get("/get-products");
      if (response.data.status) {
        const data = response.data.data;
        setProducts(data);
        setFilteredProducts(data);
        const maxPrice = Math.max(...data.map(p => p.price));
        const minPrice = Math.min(...data.map(p => p.price));
        setMaxPriceRange(maxPrice);
        setMaxPrice(maxPrice);
        setMinPrice(minPrice);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get("/get-categories");
      if (response.data.status) {
        setcategories(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handlePriceRange = (e) => {
    setMaxPriceRange(Number(e.target.value));
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const applyFilters = () => {
    let filtered = products;
  
    filtered = filtered.filter(p => p.is_active);
  
    if (selectedCategory) {
      filtered = filtered.filter(
        p => p.category_id === Number(selectedCategory)
      );
    }
  
    if (maxPriceRange > 0) {
      filtered = filtered.filter(p => p.price <= maxPriceRange);
    }
  
    if (inStockOnly) {
      filtered = filtered.filter(
        p => p.stock > 0
      );
    }
  
    setFilteredProducts(filtered);
  };

  const resetFilters = () => {
    setSelectedCategory("");
    setMaxPriceRange(maxPrice);
    setInStockOnly(false);
    setFilteredProducts(products);
  };

  return (
    <div className="container py-5">
      <Title
        title="Shop"
        tagline="Discover products you’ll love."
      />

      <div className="row g-4">
        <div className="col-3">
          <div
            className="card border-0 shadow-sm sticky-top"
            style={{ top: "80px", borderRadius: "14px" }}
          >
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0 fw-bold">
                  <i className="fa fa-sliders me-2"></i> Filters
                </h5>
                <button className="btn btn-sm btn-outline-danger" onClick={resetFilters}><i className="fa fa-refresh me-2"></i>Reset</button>
              </div>
              <div className="mb-4">
                <label className="form-label fw-semibold">
                  <i className="fa fa-tags me-2 text-muted"></i>Category
                </label>
                <select className="form-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="form-label fw-semibold d-flex justify-content-between">
                  <span>
                    <i className="fa fa-dollar-sign me-2 text-muted"></i>Max Price
                  </span>
                  <span className="badge bg-warning">${maxPriceRange}</span>
                </label>
                <input
                  type="range"
                  className="form-range"
                  min={minPrice}
                  max={maxPrice}
                  step="1"
                  value={maxPriceRange}
                  onChange={handlePriceRange}
                />
              </div>
              <div className="mb-4">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="inStock"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                  />
                  <label className="form-check-label ps-2 mt-1 fw-semibold" htmlFor="inStock">
                    In Stock Only
                  </label>
                </div>
              </div>
              <hr />
              <button className="btn btn-dark btn-sm w-100 fw-bold" onClick={applyFilters}>
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        <div className="col-9">
          <div className="row g-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <div key={product.id} className="col-lg-4 col-md-6 col-6">
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <div className="text-center my-5">
                <img
                  src="/images/no-products.webp"
                  alt="No products"
                  style={{ width: '300px', marginBottom: '20px' }}
                />
                <h4 className="mb-2">Oops! No products found.</h4>
                <p className="text-muted">
                  Try adjusting your filters or check back later for new products.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop
