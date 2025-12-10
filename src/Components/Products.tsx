import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar"
import Topbar from "./Topbar"
import './Products.css'

interface product {
  id: string;
  author: string;
  download_url: string;
}
const Products: React.FC = () => {
  const [products, setProducts] = useState<product[]>([]);


  useEffect(() => {
    fetch("https://picsum.photos/v2/list?page=1&limit=12")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);

      });
  }, []);

  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="products-container">
          <h2 className="title">Products</h2>

          <div className="products-grid">
            {products.map((item) => (
              <div className="product-card" key={item.id}>
                <img
                  src={`https://picsum.photos/id/${item.id}/300/200`}
                  alt={item.author}
                  className="product-img"
                />

                <h3 className="product-name">{item.author}</h3>

                <p className="product-desc">
                  Images
                </p>

                <div className="bottom-row">
                  <span className="product-price">₹ {(Math.random() * 9999).toFixed(0)}</span>
                  <button className="buy-btn">Buy</button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>

  )
}

export default Products
