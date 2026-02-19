import app from "./src/app.js";
import config from "./src/config/config.js";
import colors from "colors";
import mongoose from "mongoose";

(async (req, res) => {
  try {
    await mongoose.connect(config.MONGODB_URL);
    console.log("Successfully connected to MongoDB".bgBlack.magenta);

    const PORT = config.PORT;

    app.listen(PORT, () => {
      console.log(`App is Successfully running at PORT: ${PORT}`.bgBlack.blue);
    });
  } catch (error) {
    console.log(`Error in DB Connection ${error}`.bgRed.white);
    res.status(500).json({
      success: false,
      message: "Error while connecting to database",
      error,
    });
  }
})();

/*
IIFE
* Immediately Invoked Functional Expression

*/
