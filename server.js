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

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/health", healthRoute);
app.use("/api/auth", authRouter);
app.use("/api/users", userRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/expenses", expenseRoutes);

mongoose
  .connect(process.env.DBURI)
  .then(() => {
    console.log("Database connected");
    app.listen(5000, () => {
      console.log("server is live : http://localhost:5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
