import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import linkRouter from "./routes/link.routes.js";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "32kb" }));
app.use(express.static("public"));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/link", linkRouter);

export { app };
