import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select;

const ManageProducts = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [collection, setCollection] = useState("");
  const [collections, setCollections] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState(false);
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();

  // get Collection
  const getCollection = async () => {
    try {
      const { data } = await axios.get("/api/v1/collection/get-all-collection");
      if (data?.success) {
        setCollections(data?.collection);
      }
      // console.log(collections)
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting collection");
    }
  };

  useEffect(() => {
    getCollection();
  }, []);

  // create Product
  const createProduct = async (e) => {
    try {
      e.preventDefault();
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("collection", collection);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      const { data } = await axios.post(
        "/api/v1/product/create-product",
        productData,
      );
      if (data?.success) {
        toast.success(data.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while creating the product");
    }
  };

  return (
    <div className="min-h-screen">
      <h1 className="text-5xl text-cyan-300 font-bold">Manage Products</h1>
      <form onSubmit={createProduct}>
        <div className="my-6">
          <Select
            placeholder="Select a collection"
            size="large"
            value={collection || undefined}
            showSearch
            className="w-auto md:min-w-125 mx-auto"
            onChange={(value) => setCollection(value)}
          >
            {collections.map((item) => {
              return (
                <Option key={item._id} value={item._id}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
        </div>
        {/* get photo */}
        <div className="mt-6">
          <label
            htmlFor="upload-images"
            className="cursor-pointer bg-gray-800 px-6 py-2 rounded-sm"
          >
            {photo ? photo.name : "Upload photo"}

            <input
              id="upload-images"
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </label>
        </div>
        <div className="my-6">
          {photo && (
            <div>
              <img
                src={URL.createObjectURL(photo)}
                alt="product-photo"
                className="w-64"
              />
            </div>
          )}
        </div>
        <div>
          {/* name */}
          <div className="my-4">
            <input
              type="text"
              value={name}
              placeholder="Product Name"
              className="border-none outline-none bg-gray-800 tracking-wider w-auto md:min-w-125  mx-auto px-4 py-2 rounded-sm"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          {/* description */}
          <div>
            <textarea
              type="text"
              value={description}
              placeholder="Description"
              className="border-none outline-none bg-gray-800 tracking-wider w-auto md:min-w-125  mx-auto px-4 py-2 rounded-sm"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
          </div>
          {/* price */}
          <div className="my-2">
            <input
              type="number"
              value={price}
              placeholder="Price"
              className="border-none outline-none bg-gray-800 tracking-wider w-auto md:min-w-125 mx-auto px-4 py-2 rounded-sm"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          {/* quantity */}
          <div className="my-4">
            <input
              type="number"
              value={quantity}
              placeholder="Stock"
              className="border-none outline-none bg-gray-800 tracking-wider w-auto md:min-w-125 mx-auto px-4 py-2 rounded-sm"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          {/* Shipped */}
          <div className="my-4">
            <Select
              size="large"
              placeholder="Select Shipping"
              onChange={(value) => setShipping(value)}
            >
              <Option value={true}>Yes</Option>
              <Option value={false}>No</Option>
            </Select>
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="relative px-8 py-4 ml-4 overflow-hidden font-semibold rounded dark:bg-gray-800 dark:text-gray-50"
            >
              Create Product
              <span className="absolute top-0 right-0 px-5 py-1 text-xs tracking-wider text-center uppercase whitespace-no-wrap origin-bottom-left transform rotate-45 -translate-y-full translate-x-1/3 dark:bg-cyan-600 text-transparent ">
                new
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ManageProducts;
