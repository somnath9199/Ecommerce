import { useState } from "react";

 function Adminpage() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: "", price: "", description: "", image: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProducts([...products, formData]);
    setFormData({ name: "", price: "", description: "", image: "" });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Panel - Add Product</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input className="border p-2 rounded" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
          <input className="border p-2 rounded" name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} required />
          <input className="border p-2 rounded" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
          <input className="border p-2 rounded" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required />
          <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600" type="submit">Add Product</button>
        </form>
      </div>
      <h2 className="text-xl font-semibold mb-4">Product List</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Image</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">${product.price}</td>
                <td className="border p-2">{product.description}</td>
                <td className="border p-2">
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover mx-auto" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Adminpage;