import React from "react";
import { Toaster, toast } from "react-hot-toast";

const TestingPage = () => {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <h1>Hello World</h1>
      <button
        onClick={() => toast.success("Toaster is working!")}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Show Toast
      </button>
    </div>
  );
};

export default TestingPage;
