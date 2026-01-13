import { useEffect, useState } from "react";
import Carousel from '../components/Carousel';
import TopCategories from '../components/TopCategories';
import Image from '../components/Image';
import ProductCard from '../components/ProductCard';
import slider2 from '/images/slider-2.png';
import api from "../api/Axios";

function Home() {
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
    <>
      <Carousel />
      <TopCategories />
      <div className="container mt-4">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-lg-6 d-flex justify-content-center align-items-center">
            <Image src={slider2} className="d-block mx-lg-auto img-fluid" width="700" height="500" alt="Featured Product" />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold lh-1 mb-3">Shop the Latest Trends</h1>
            <p className="lead">Discover our newest collection of products. From electronics to fashion, find everything you need with amazing deals and fast shipping.</p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <button type="button" className="btn btn-primary btn-lg px-4 me-md-2">Shop Now</button>
              <button type="button" className="btn btn-outline-secondary btn-lg px-4">Learn More</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-4">
        <h2 className="mb-4">Featured Products</h2>
        <div className="row">
          {products.filter(product => product.is_active && product.is_featured).map(product => (
            <div key={product.id} className="col-md-4 col-lg-3 col-6 mb-4">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
