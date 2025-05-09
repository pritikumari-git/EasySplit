import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRouter from "./src/routes/auth.js";
import userRoutes from "./src/routes/userRoutes.js";
import groupRoutes from "./src/routes/groupRoutes.js";
import expenseRoutes from "./src/routes/expenseRoute.js";
import healthRoute from "./src/routes/health.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({ origin: "https://easysplit-frontend.onrender.com", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/health", healthRoute);
app.use("/api/auth", authRouter);
app.use("/api/users", userRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/expenses", expenseRoutes);

const PORT = process.env.PORT || 5000;  // Use Render's port or fallback
const MONGO_URI = process.env.MONGO_URI; // We'll set this in Render dashboard

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server is live : http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
