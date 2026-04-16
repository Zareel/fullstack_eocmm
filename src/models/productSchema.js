import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique:true
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxLength: [120, "Description cannot exceed 120 chars"],
    },
    price: {
      type: Number,
      required: true,
    },
    collection: {
      type: mongoose.ObjectId,
      ref: "Collection",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      type: Boolean,
      required: true,
      default:"false"
    },
  },
  { timestamps: true },
);

export default mongoose.model("Product", productSchema);
