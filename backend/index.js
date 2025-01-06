import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import { errorMiddleware } from "./src/middlewares/errorMiddleware.js";
import cors from "cors";

const app = express();
const port = 3000;
connectDB();

app.use(express.json());
app.use(cors());



// Routes
app.use("/auth", authRoutes);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
