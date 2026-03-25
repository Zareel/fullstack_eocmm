import Collection from "../models/collectionSchema.js";

export const createCollection = async (req, res) => {
  try {
    // get the info from the frontend
    const { name } = req.body;

    // validation
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Please provide a collection name",
      });
    }
    // check if the name already exists in the db
    const existingCollection = await Collection.findOne({ name });
    // if exists send response
    if (existingCollection) {
      return res.status(200).json({
        success: false,
        message: "Collection already exists",
      });
    }
    // else create new collection
    const collection = await Collection.create({ name });
    // send success response
    res.status(200).json({
      status: true,
      message: "New collecion has been created successfully",
      collection,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Error in create collection ${error}`,
      error,
    });
  }
};
