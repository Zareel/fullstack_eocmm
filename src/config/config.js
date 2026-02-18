import dotenv from "dotenv"

dotenv.config()

const config = {
    PORT:process.env.PORT || 4000,
    MONGODB_URL:process.env.MONGODB_URL || "mongodb+srv://zareelbwd:zareel@ecommerce.oeahohd.mongodb.net/newecomm"

}

export default config