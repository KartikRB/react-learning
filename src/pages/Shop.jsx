import Title from "../components/Title"
import ProductCard from '../components/ProductCard';
import headphones from '/images/products/headphones.png';
import watch from '/images/products/watch.jpg';
import mouse from '/images/products/mouse.jpg';
import tv from '/images/products/tv.jpg';
import speaker from '/images/products/speaker.jpg';
import keyboard from '/images/products/keyboard.jpg';
import laptopBag from '/images/products/laptop-bag.jpg';
import usbHub from '/images/products/usb-c-hub.jpg';
import earbuds from '/images/products/earbuds.png';
import keyboard2 from '/images/products/keyboard-2.jpg';
import fBand from '/images/products/f-band.jpg';
import stick from '/images/products/4k-stick.jpg';
import gamingHeadset from '/images/products/gaming-headset.jpg';
import homeCamera from '/images/products/home-camera.png';

function Shop() {
  const products = [
    { id: 1, name: "Wireless Headphones", price: 59.99, image: headphones, description: "High-quality wireless headphones with noise cancellation.", rating: 4.5, category: "Audio", stock: 12 },
    { id: 2, name: "Smart Watch", price: 129.99, image: watch, description: "Track your fitness and notifications with style.", rating: 2.2, category: "Wearables", stock: 5 },
    { id: 3, name: "Gaming Mouse", price: 39.99, image: mouse, description: "Ergonomic gaming mouse with customizable buttons.", rating: 4.8, category: "Gaming", stock: 20 },
    { id: 4, name: "Smart Android LED TV", price: 699.99, image: tv, description: "High-definition smart TV with Android OS and streaming apps.", rating: 4.6, category: "Electronics", stock: 7 },
    { id: 5,name: "Bluetooth Speaker",price: 49.99,image: speaker,description: "Portable Bluetooth speaker with deep bass.",rating: 4.3,category: "Audio",stock: 15},
    { id: 6,name: "Wireless Keyboard",price: 34.99,image: keyboard,description: "Slim wireless keyboard with long battery life.",rating: 4.1,category: "Accessories",stock: 18},
    { id: 7,name: "Laptop Backpack",price: 44.99,image: laptopBag,description: "Durable backpack with laptop protection.",rating: 4.4,category: "Accessories",stock: 25},
    { id: 8,name: "USB-C Hub",price: 29.99,image: usbHub,description: "Multi-port USB-C hub for laptops and tablets.",rating: 4.2,category: "Electronics",stock: 30},
    { id: 9,name: "Noise Cancelling Earbuds",price: 79.99,image: earbuds,description: "Compact earbuds with active noise cancellation.",rating: 4.6,category: "Audio",stock: 10},
    { id: 10,name: "Mechanical Keyboard",price: 89.99,image: keyboard2,description: "RGB mechanical keyboard for gaming and typing.",rating: 4.7,category: "Gaming",stock: 8},
    { id: 11,name: "Fitness Band",price: 59.99,image: fBand,description: "Monitor your daily activity and sleep.",rating: 4.0,category: "Wearables",stock: 22},
    { id: 12,name: "4K Streaming Stick",price: 49.99,image: stick,description: "Stream your favorite content in 4K quality.",rating: 4.5,category: "Electronics",stock: 14},
    { id: 13,name: "Gaming Headset",price: 69.99,image: gamingHeadset,description: "Surround sound headset with mic for gaming.",rating: 4.6,category: "Gaming",stock: 9},
    { id: 14,name: "Smart Home Camera",price: 99.99,image: homeCamera,description: "Wi-Fi smart camera with night vision.",rating: 4.4,category: "Smart Home",stock: 11}    
  ];

  return (
    <div className="container py-5">
      <Title
        title="Shop"
        tagline="Discover products you’ll love."
      />

      <div className="row g-4">
        {products.map(product => (
          <div key={product.id} className="col-md-4 col-lg-3 col-6 mb-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Shop
