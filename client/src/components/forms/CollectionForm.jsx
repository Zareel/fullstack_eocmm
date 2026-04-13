import React from "react";

const CollectionForm = ({ handleSubmit, value, setValue, handleOk }) => {
 
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-6 mb-10">
        <input
          type="text"
          placeholder="Enter collection name.."
          className="bg-stone-950 px-4 py-2 text-white rouned-sm w-96 border-none outline-none tracking-wider"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          type="submit"
          className="bg-purple-600 text-white w-36 rounded-md px-6"
        >
          Enter
        </button>
      </form>
    </div>
  );
};

export default CollectionForm;
