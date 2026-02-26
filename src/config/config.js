import dotenv from "dotenv"

dotenv.config()

const config = {
    PORT:process.env.PORT || 4000,
    MONGODB_URL:process.env.MONGODB_URL || "mongodb+srv://zareelbwd:zareel@ecommerce.oeahohd.mongodb.net/newecomm",
    JWT_EXPIRY:process.env.JWT_EXPIRY,
    JWT_SECRET:process.env.JWT_SECRET

}

export default config