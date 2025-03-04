import React, { useState } from 'react';
import { Search, ChevronDown, Filter } from 'lucide-react';

const Sidebar = () => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [brands, setBrands] = useState({
    brandA: false,
    brandB: false,
    brandC: false,
  });
  const [filters, setFilters] = useState({
    available: false,
    discount: false,
  });

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

  const handleFilterChange = (filter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: !prevFilters[filter],
    }));
  };

  return (
    <div className="w-64 p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-6">Shop by Category</h2>
      <ul className="space-y-3">
        <li><a href="#" className="hover:text-gray-400">Electronics</a></li>
        <li><a href="#" className="hover:text-gray-400">Fashion</a></li>
        <li><a href="#" className="hover:text-gray-400">Home Appliances</a></li>
        <li><a href="#" className="hover:text-gray-400">Books</a></li>
        <li><a href="#" className="hover:text-gray-400">Sports</a></li>
      </ul>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Price Range</h3>
        <div className="flex items-center space-x-3 mb-4">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
            className="p-2 bg-gray-700 text-sm text-white rounded-md w-20"
            min="0"
          />
          <span>-</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
            className="p-2 bg-gray-700 text-sm text-white rounded-md w-20"
            max="1000"
          />
        </div>
        <input
          type="range"
          min="0"
          max="1000"
          value={priceRange.join(',')}
          onChange={handlePriceChange}
          className="w-full"
        />
        <p className="text-sm text-gray-400 mt-2">
          Price: ${priceRange[0]} - ${priceRange[1]}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Brands</h3>
        <ul className="space-y-3">
          {Object.keys(brands).map((brand) => (
            <li key={brand} className="flex items-center">
              <input
                type="checkbox"
                checked={brands[brand]}
                onChange={() => handleBrandChange(brand)}
                className="mr-2"
              />
              <label className="text-sm">{brand}</label>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Filters</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Available</span>
            <input
              type="checkbox"
              checked={filters.available}
              onChange={() => handleFilterChange('available')}
              className="rounded-md"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Discount</span>
            <input
              type="checkbox"
              checked={filters.discount}
              onChange={() => handleFilterChange('discount')}
              className="rounded-md"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search products"
          className="ml-2 p-2 bg-gray-700 text-sm text-white rounded-md w-full"
        />
      </div>
    </div>
  );
};

export default Sidebar;
