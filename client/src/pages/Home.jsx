import React, { useContext, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import AuthContext from "../context/AuthContext";
import CartContext from "../context/CartContex";
import Dropdown from "../components/Dropdown";
import axios from "axios";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const Home = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [cart, setCart] = useContext(CartContext);
  const [products, setProducts] = useState([]);

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
  return (
    <div className="min-auto bg-stone-900 px-18  text-lg text-cyan-300">
      <Helmet>
        <title>MarqueZ-Home</title>
      </Helmet>

      <div>
        <pre>{JSON.stringify(auth, null, 4)}</pre>
        <h1>Products</h1>
        <div className="flex gap-10 flex-wrap pb-24">
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
                      to="dashboard/user/cart"
                      className="px-8 py-3 text-xs font-semibold rounded bg-cyan-800 hover:bg-amber-500 dark:text-gray-100"
                      onClick={() => {
                        setCart([...cart, item]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, item]),
                        );
                        toast.success("Product added to the cart");
                      }}
                    >
                      Add to Cart
                    </Link>
                    <button
                      onClick={() => {
                        deleteProduct(item._id);
                      }}
                      className="px-8 py-2.5 font-semibold text-xs cursor-pointer rounded bg-cyan-800 hover:bg-red-600 dark:text-gray-100"
                    >
                      Move to Wishlist
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
