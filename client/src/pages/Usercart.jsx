import React, { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';

const Usercart = () => {
  const [products, setProducts] = useState([]);
  const [TotalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.post('v2/api/userCart', {
          userId: "679a46cc84e78a633a053e5f"
        });
        setProducts(response.data.message.products);
        
        setTotalAmount(response.data.message.TotalAmount);
      } catch (error) {
        console.log(error);
        toast.error("Some error occurred in fetching data");
      }
    }

    fetchProducts();
  }, []);  

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        
        <div className="bg-white shadow-md rounded-lg p-4">
          <ul className="space-y-4">
            {products.map((item) => (
              <li key={item._id} className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="font-semibold text-lg">Product {item.product}</span>
                </div>
                <span className="text-gray-700">Quantity: {item.quantity}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex justify-between items-center">
            <span className="text-xl font-semibold">Total: ₹{TotalAmount}</span>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usercart;
