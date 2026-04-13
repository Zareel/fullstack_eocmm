import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CollectionForm from "../../components/forms/CollectionForm";
import { Modal } from "antd";

const ManageCollection = () => {
  const [collection, setCollection] = useState([]);
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // antd
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // create collection
  const createCollection = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/api/v1/collection/create-collection",
        { name },
      );
      if (data?.success) {
        toast.success("collection has been created successfully");
        getCollection();
        setName("");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wron while creating collection");
    }
  };

  const getCollection = async () => {
    try {
      const { data } = await axios.get("/api/v1/collection/get-all-collection");
      if (data?.success) {
        setCollection(data.collection);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting collection");
    }
  };

  useEffect(() => {
    getCollection();
  }, []);

  // delete Collection
  const deleteCollection = async (id) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/collection/delete-collection/${id}`,
      );
      if (data?.success) {
        getCollection();
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in delete collection");
    }
  };

  // update collectin
  const updateCollection = async (e) => {
    e.preventDefault();
    try {
      // console.log(e);
      const { data } = await axios.put(
        `/api/v1/collection/update-collection/${selected._id}`,
        { name: updatedName },
      );
      if (data.success) {
        toast.success(data.message);
        setSelected(null);
        setUpdatedName("");
        showModal(false);
        setIsModalOpen(false);
        getCollection();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating collection");
    }
  };

  return (
    <div>
      <h1 className="text-5xl text-cyan-300 font-bold pb-10">
        Manage Collection{" "}
      </h1>

      <CollectionForm
        handleSubmit={createCollection}
        value={name}
        setValue={setName}
      />

      <table className="w-full border border-gray-700 text-left">
        <thead className="bg-gray-800 text-gray-300">
          <tr className="border bg-gray-800 ">
            <th className="p-3"></th>
            <th className="p-3 ">Collection Name</th>
            <th className="p-3 ">Actions</th>
          </tr>
        </thead>

        <tbody>
          {collection.map((item, index) => (
            <tr
              key={item._id}
              className="text-gray-400 hover:text-gray-100 border"
            >
              <td className="p-3 cursor-pointer">{index + 1}</td>
              <td className="p-3 cursor-pointer ">{item.name}</td>
              <td className="flex gap-3 items-center">
                <div
                  onClick={() => {
                    deleteCollection(item._id);
                  }}
                  className="p-3 cursor-pointer text-red-500 hover:text-red-400"
                >
                  <DeleteIcon />
                </div>
                <div
                  className="text-yellow-500 hover:text-yellow-400 ml-6"
                  onClick={() => {
                    showModal();
                    setUpdatedName(item.name);
                    setSelected(item);
                  }}
                >
                  <EditIcon />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        title="Collection"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <CollectionForm
          value={updatedName}
          setValue={setUpdatedName}
          handleSubmit={updateCollection}
        />
      </Modal>
    </div>
  );
};

export default ManageCollection;
