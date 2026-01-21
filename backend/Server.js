import express from "express"
import mongoose from  "mongoose"
import cors from "cors"
import dotenv from "dotenv"


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// mongoose.connect(process.env.MONGO_URL)
//         .then(()=>{console.log("Mongo DB connected");
//             app.listen(5000, console.log("Server Running"))
//         })
//         .catch((err)=>console.error(err));

app.listen(5000, console.log("Backend Running"))
