import Product from "../models/productSchema.js";
import fs from "fs";
import slugify from "slugify";

export const createProduct = async (req, res) => {
  try {
    // get info from frontend. As we have installed formidable we will grab the data from req.fields instead of req.body
    const { name, description, price, collection, quantity } = req.fields;
    // get photo from req.files
    const { photo } = req.files;

    // validation
    if (!name || !description || !price || !collection || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Pls fill all the fields",
      });
    }

    // photo validation
    if (!photo || photo.size > 1000000) {
      return res.status(400).json({
        success: false,
        message: "Photo is required and it cannot be more than 1MB",
      });
    }

    // check if the product already exists in the database
    const existingProduct = await Product.findOne({ name });

    // if exist send response
    if (existingProduct) {
      return res.status(409).json({
        success: false,
        message: "Product already exists",
      });
    }

    // if not exists create new product
    const product = new Product({
      ...req.fields,
      slug: slugify(name, { lower: true }),
    });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    // save the product
    await product.save();

    // send success message
    res.status(200).json({
      success: true,
      message: "New product has been created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in creating product",
      error,
    });
  }
};
