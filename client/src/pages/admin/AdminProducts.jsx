import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  // get all products
  const getProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-all-products");
      // console.log(data)
      if (data?.success) {
        setProducts(data.products);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching the products");
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="min-h-screen">
      <h1 className="text-5xl text-cyan-300 font-bold pb-10">Products</h1>
      <div className="flex gap-10 flex-wrap">
        {products.map((item) => {
          return (
            <Link  key={item._id} className="w-xs rounded-md shadow-md bg-gray-50 text-gray-900">
              <img
                src={`/api/v1/product/product-photo/${item._id}`}
                alt=""
                className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500"
              />
              <div className="flex flex-col justify-between p-2 space-y-4">
                <div className="space-y-2 flex justify-between">
                <div>
                      <h2 className="text-3xl font-semibold tracking-wide">
                    {item.name}
                  </h2>
                  <p className="text-gray-400">
                    {item.description}
                  </p>
                </div>
                  <p>Rs.{item.price}</p>
                </div>
                <div className="flex gap-4 justify-center mb-2">
                    <Link to={`/dashboard/admin/product/${item.slug}`} className="px-8 py-3 font-semibold rounded bg-cyan-800 dark:text-gray-100">Update</Link>
                    <button className="px-8 py-2.5 font-semibold rounded bg-cyan-800 dark:text-gray-100">Delete</button>
                </div>
                
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AdminProducts;
