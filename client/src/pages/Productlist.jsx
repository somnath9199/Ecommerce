import React, { useState, useEffect } from "react";
import axios from "axios";
import { ShoppingCart } from "lucide-react";
import Star from "../assets/Start.svg";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("v2/api/getproducts");
        setProducts(response.data.message);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products");
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    try {
      const response = await axios.post("v2/api/Addtocart", {
        userId: "679a46cc84e78a633a053e5f",
        productId: productId,
      });
      alert(response.data.message);
    } catch (err) {
      alert("Failed to add product to cart");
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            image={product.images[0]}
            name={product.name}
            price={product.price}
            discount={product.discounts}
            rating={4.5}
            addToCart={() => addToCart(product._id)}
          />
        ))}
      </div>
    </div>
  );
}

const ProductCard = ({ image, name, price, discount, rating, addToCart }) => {
  return (
    <div className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="/">
        <img className="object-cover" src={image} alt={name} />
        {discount && (
          <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
            {discount}% OFF
          </span>
        )}
      </a>
      <div className="mt-4 px-5 pb-5">
        <a href="/">
          <h5 className="text-xl tracking-tight text-slate-900">{name}</h5>
        </a>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-slate-900">${price}</span>
            {discount && (
              <span className="text-sm text-slate-900 line-through">${(price / (1 - discount / 100)).toFixed(2)}</span>
            )}
          </p>
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <img
                key={index}
                src={Star}
                className={`h-5 w-5 ${index < rating ? "text-yellow-300" : "text-gray-300"}`}
                alt="rating-star"
              />
            ))}
            <span className="ml-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">{rating.toFixed(1)}</span>
          </div>
        </div>
        <button
          onClick={addToCart}
          className="flex w-full items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <ShoppingCart className="mr-2 h-6 w-6" />
          Add to cart
        </button>
      </div>
    </div>
  );
};