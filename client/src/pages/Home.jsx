import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Data from '../data/data';
import Loader from '../Loader/Loader';
import { Search, Filter, ChevronDown } from 'lucide-react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter States
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [brands, setBrands] = useState({
    brandA: false,
    brandB: false,
    brandC: false,
  });

  useEffect(() => {
    setTimeout(() => {
      setProducts(Data);
      setLoading(false);
    }, 1000);
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

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
    <div className="flex">
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
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Product Listing</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {currentProducts.map((product, index) => (
                <ProductCard key={index} {...product} />
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
  );
};

export default Home;
