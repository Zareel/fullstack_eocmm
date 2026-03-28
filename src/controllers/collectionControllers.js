import Collection from "../models/collectionSchema.js";
import slugify from "slugify";




// get all collection
export const getAllCollection = async (req, res) => {
  try {
    const collection = await Collection.find();
    if (!collection) {
      return res.status(404).json({
        success: false,
        message: "Collections not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Successfully fetched all collection",
      count: collection.length,
      collection,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Error in getting all collection ${error}`,
      error,
    });
  }
};

// delete collection
export const deleteCollection = async(req, res) => {
  try{
    const {id} = req.params
   const collectionToDelete =  await Collection.findByIdAndDelete(id)

   if(!collectionToDelete){
    return res.status(404).json({
      success:false,
      message:"Collection not found"
    })
   }

   res.status(200).json({
    success:true,
    message:"Collection has been deleted succesfully",
    collectionToDelete
   })


  }catch(error){
    console.log(error)
    res.status(500).json({
      success:false,
      message:"Error in delete collection",
      error
    })
  }
}

// get single collection
export const singleCollection = async(req, res) => {
  try{
    const singleCollection = await Collection.findOne({id:req.params._id})
    res.status(200).json({
      success:true,
      message:"Successfully fetched single collection",
      singleCollection
    })

  }catch(error){
    console.log(error)
    res.status(500).json({
      success:false,
      message:"Error in getting single collection",
      error
    })
  }
}

// update collection
export const updateCollection = async(req, res) =>{
  const {id} = req.params
  const {name} = req.body
  try{
    const collection = await Collection.findByIdAndUpdate(id, {name, slug:slugify(name)}, {new:true})
    res.status(200).json({
      success:true,
      message:"Collection name has been updated successfully",
      collection
    })

  }catch(error){
    console.log(error)
    res.status(500).json({
      success: false,
      message:`Error in updating the collection ${error}`,
      error

    })
  }
}

// Create collection
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
    const collection = await Collection.create({ name, slug:slugify(name) });
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


