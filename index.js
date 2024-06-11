import dotenv from "dotenv";
import connectDb from "./src/db/index.js";
import { app } from "./src/app.js";
dotenv.config({
  path: "./env",
});

connectDb()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to the database", err);
    process.exit(1);
  });
