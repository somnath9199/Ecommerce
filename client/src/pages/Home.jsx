import React, { useState, useEffect } from 'react';
import Loader from '../Loader/Loader';
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast';
import Star from "../assets/Start.svg";
import { Search, Filter, ChevronDown, ShoppingCart } from 'lucide-react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("v2/api/getproducts");
        setProducts(response.data.message);
        setLoading(false);
      } catch (err) {
        toast.error("Network Slow")
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
      return toast.success("Added to Cart")
    } catch (err) {
      return toast.error("Try Again")
    }
  };

  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [brands, setBrands] = useState({
    brandA: false,
    brandB: false,
    brandC: false,
  });



  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePriceChange = (event) => {
    const value = event.target.value.split(',').map(Number);
    setPriceRange(value);
  };

  const handleBrandChange = (brand) => {
    setBrands((prevBrands) => ({
      ...prevBrands,
      [brand]: !prevBrands[brand],
    }));
  };

  return (
    <div>
      <div className="flex">
        <Toaster position="top-right" reverseOrder={false} />
        {/* Sidebar */}
        <div className="w-[25%] p-6 bg-white shadow-lg rounded-md border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Shop by Category</h2>
          <div className="mt-6 flex items-center justify-between">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search products"
              className="ml-2 p-2 bg-gray-100 text-sm text-gray-700 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <br />
          <ul className="space-y-4">
            <li><a href="#" className="hover:text-indigo-600">Electronics</a></li>
            <li><a href="#" className="hover:text-indigo-600">Fashion</a></li>
            <li><a href="#" className="hover:text-indigo-600">Home Appliances</a></li>
            <li><a href="#" className="hover:text-indigo-600">Books</a></li>
            <li><a href="#" className="hover:text-indigo-600">Sports</a></li>
          </ul>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Price Range</h3>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange.join(',')}
              onChange={handlePriceChange}
              className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
            />
            <p className="text-sm text-gray-400 mt-2">
              Price: ${priceRange[0]} - ${priceRange[1]}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Brands</h3>
            <ul className="space-y-3">
              {Object.keys(brands).map((brand) => (
                <li key={brand} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={brands[brand]}
                    onChange={() => handleBrandChange(brand)}
                    className="mr-2 text-indigo-600"
                  />
                  <label className="text-sm text-gray-700">{brand}</label>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Filters</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Available</span>
              <ChevronDown size={16} className="text-gray-500" />
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-gray-600">Discount</span>
              <ChevronDown size={16} className="text-gray-500" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow p-6">
          {loading ? (
            <div className="flex justify-center items-center h-screen bg-gray-50 absolute top-0 left-0 w-full z-50">
              <Loader />
            </div>
          ) : (
            <div>
              <div className="flex justify-end list-center">
                <ShoppingCart className='' />

              </div>
              <h1 className="text-3xl font-semibold text-gray-800 mb-6">Product Listing</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
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
              <div className="mt-6 flex justify-center gap-4">
                {[...Array(Math.ceil(products.length / itemsPerPage))].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`px-4 py-2 border rounded-lg transition-all ${currentPage === index + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


const ProductCard = ({ image, name, price, discount, rating , addToCart}) => {
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
        <button onClick={addToCart}
          className="flex w-full items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <ShoppingCart className="mr-2 h-6 w-6" />
          Add to cart
        </button>
      </div>
    </div>
  );
};
export default Home;
