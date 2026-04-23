import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const params = useParams();

  // get all products
  const getProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-all-products");
      // console.log(data)
      if (data?.success) {
        setProducts(data?.products);
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

  const deleteProduct = async (id) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${id}`,
      );
      if (data?.success) {
        getProducts();
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting the product");
    }
  };

  return (
    <div className="min-h-screen">
      <h1 className="text-5xl text-cyan-300 font-bold pb-10">Products</h1>
      <div className="flex gap-10 flex-wrap">
        {products.map((item) => {
          return (
            <div
              key={item._id}
              className="w-xs rounded-md shadow-md bg-gray-50 text-gray-900"
            >
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
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                  <div>
                    <p>Rs.{item.price}</p>
                    <p className="text-gray-600 font-semibold text-sm">
                      Stock:
                      <span className="text-lg text-black">
                        {item.quantity}
                      </span>{" "}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 justify-center mb-2">
                  <Link
                    to={`/dashboard/admin/product/${item.slug}`}
                    className="px-8 py-3 font-semibold rounded bg-cyan-800 hover:bg-amber-500 dark:text-gray-100"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => {
                      deleteProduct(item._id);
                    }}
                    className="px-8 py-2.5 font-semibold cursor-pointer rounded bg-cyan-800 hover:bg-red-600 dark:text-gray-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminProducts;
