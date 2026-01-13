import { useEffect, useState } from "react";
import Title from "../components/Title"
import ProductCard from '../components/ProductCard';
import api from "../api/Axios";

function Shop() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/get-products");
      if (response.data.status) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container py-5">
      <Title
        title="Shop"
        tagline="Discover products you’ll love."
      />

      <div className="row g-4">
        {products.filter(product => product.is_active).map(product => (
          <div key={product.id} className="col-md-4 col-lg-3 col-6 mb-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Shop
