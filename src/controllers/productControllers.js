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
    // 409: conflict
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
    res.status(201).json({
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

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("collection")
      .select("-photo")
      .limit(15)
      .sort({ createdAt: -1 });
    if (!products) {
      return res.status(404).json({
        success: false,
        message: "No Products found",
      });
    }
    res.status(200).json({
      success: true,
      message: "All Products",
      count: products.length,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in fetching products",

      error,
    });
  }
};

export const singleProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate("collection")
      .select("-photo");
    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in fetching single product",
      error,
    });
  }
};

// get photo
export const productPhoto = async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in fetching photo",
      error,
    });
  }
};

// delete product
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).json({
      success: true,
      message: "Product has been deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in deleting product",
      error,
    });
  }
};

// update product
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, collection, quantity } = req.fields;
    const { photo } = req.files;

    // validation
    if (!name || !description || !price || !collection || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Pls fill all the fields",
      });
    }

    // photo validatin
    if (!photo || photo.size > 1000000) {
      return res.status(400).json({
        success: false,
        message: "photo is required",
      });
    }

 

    const product = await Product.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true },
    );
    // handle photo
    if(photo){
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type
    }
    await product.save();
    res.status(201).json({
      success:true,
      message:"Product has been updated successfully",
      product
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in updating product",
      error,
    });
  }
};
